interface appliedDiscount {
  amount?: string;
  description?: string;
  title?: string;
  value: number;
  valueType: string;
}

interface lineItem {
  variantId: string;
  quantity: number;
  appliedDiscount?: appliedDiscount;
}

interface draftOrderMutation {
  email?: string;
  lineItems: lineItem[];
  appliedDiscount?: appliedDiscount;
}

export type {
  draftOrderMutation,
  lineItem,
  appliedDiscount
}