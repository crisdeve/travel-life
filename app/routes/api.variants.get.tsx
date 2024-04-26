import { LoaderFunctionArgs, json } from "@remix-run/node";

import { getFirstVariants, getProductsByQuery } from "~/services/graphql/products";

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const sku = new URL(request.url).searchParams.get('sku')
  
  if (!sku) {
    const { data } = await getFirstVariants()
    return json({ data })
  }

  console.log(sku);
  
  const { data } = await getProductsByQuery(sku)

  return json({ data })
};