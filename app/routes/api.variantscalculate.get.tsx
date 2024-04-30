import { LoaderFunctionArgs, json } from "@remix-run/node";

import { calculateDraftOrderPerLines } from "~/services/graphql/draftOrders";
import { getFirstVariants, getProductsByQuery } from "~/services/graphql/productsVariants";

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const sku = new URL(request.url).searchParams.get('sku')
  let variants = []
  
  if (sku) {
    const { data } = await getProductsByQuery(sku)
    variants = data
  }
  
  if (!variants) {
    const { data } = await getFirstVariants()
    variants = data
  }

  const lineItems = variants.productVariants.edges.map(({node}) => ({
    variantId: node.id,
    quantity: 1,
  }))

  if (!lineItems) {
    return json({ data: [] })
  }

  const order = await calculateDraftOrderPerLines({
    email: 'daihana.marin@gradiweb.com',
    lineItems: lineItems,
  })

  return json({ data: order })
};