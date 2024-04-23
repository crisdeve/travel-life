import { json } from "@remix-run/node";

import { getDraftOrder } from "~/services/graphql/draftOrders";

const orderNumber = 1154590474519

export const loader = async () => {
  const order = await getDraftOrder(orderNumber)

  return json({ order })
};