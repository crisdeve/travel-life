import { json } from "@remix-run/node";

import { updateDraftOrder } from "~/services/graphql/draftOrders";

const draftId = 1154590474519;

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
  acceptAutomaticDiscounts: true,
  lineItems: lineItems,
}

export const loader = async () => {
  const order = await updateDraftOrder(draftId, input)

  return json({ order })
};