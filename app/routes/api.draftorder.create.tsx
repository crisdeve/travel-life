import { json } from "@remix-run/node";

import { postDraftOrder } from "~/services/graphql/draftOrders";

const lineItems = [
  {
    variantId: "gid://shopify/ProductVariant/48419759653143",
    quantity: 1,
  }
]

const input = {
  email: 'daihana.marin@gradiweb.com',
  lineItems: lineItems,
}

export const loader = async () => {
  const order = await postDraftOrder(input, true)

  return json({ order })
};