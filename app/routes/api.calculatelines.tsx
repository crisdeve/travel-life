import { json } from "@remix-run/node";

import { calculateDraftOrderPerLines } from "~/services/graphql/draftOrders";

const lineItems = [
  {
    variantId: "gid://shopify/ProductVariant/48419444130071",
    quantity: 1,
  },
  {
    variantId: "gid://shopify/ProductVariant/48419444162839",
    quantity: 1,
  },
  {
    variantId: "gid://shopify/ProductVariant/48419444195607",
    quantity: 1,
  }
]

const input = {
  email: 'daihana.marin@gradiweb.com',
  acceptAutomaticDiscounts: true,
  lineItems: lineItems,
}

export const loader = async () => {
  const order = await calculateDraftOrderPerLines(input)

  return json({ order })
};