import { json } from "@remix-run/node";

import { putDraftOrder } from "~/services/graphql/draftOrders";

const lineItems = [
  {
    variantId: "gid://shopify/ProductVariant/48419583394071",
    quantity: 1,
  }
]

const draftId = 1154590474519;

const input = {
  acceptAutomaticDiscounts: true,
  lineItems: lineItems,
}

export const loader = async () => {
  const order = await putDraftOrder(draftId, input)

  return json({ order })
};