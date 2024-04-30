import { draftOrderMutation } from '../interfaces/orderAndLineItem';
import shopify from '../shopify.server'

const DraftOrderLineItem = `
  appliedDiscount {
    amountSet {
      shopMoney {
        amount
        currencyCode
      }
    }
    value
    valueType
    description
  }
  isCustomLineItem: custom
  discountedTotalSet {
    shopMoney {
      amount
      currencyCode
    }
  }
  discountedUnitPriceSet {
    shopMoney {
      amount
      currencyCode
    }
  }
  originalUnitPriceSet {
    shopMoney {
      amount
      currencyCode
    }
  }
  product {
    id
    title
    totalVariants
  }
  quantity
  requiresShipping
  sku
  taxable
  title
  variantTitle
  variant {
    id
  }
`

const DraftOrderLineItemFragment = `
  fragment DraftOrderLineItemFragment on DraftOrderLineItem {
    ${DraftOrderLineItem}
  }
`

const draftOrderFragment = `
  fragment DraftOrderDetailsFragment on DraftOrder {
    id
    acceptAutomaticDiscounts
    lineItems(first: 50) {
      pageInfo {
        hasNextPage
        __typename
      }
      edges {
        cursor
        node {
          id
          ...DraftOrderLineItemFragment
          __typename
        }
        __typename
      }
      __typename
    }
    taxLines {
      priceSet {
        presentmentMoney {
          amount
          currencyCode
          __typename
        }
        shopMoney {
          amount
          currencyCode
          __typename
        }
        __typename
      }
      rate
      ratePercentage
      title
      __typename
    }
    totalTaxSet {
      presentmentMoney {
        amount
        currencyCode
        __typename
      }
      shopMoney {
        amount
        currencyCode
        __typename
      }
      __typename
    }
  }
`

const mutationCreateDO = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        ...DraftOrderDetailsFragment
      }
      userErrors {
        field
        message
      }
    }
  }

  ${draftOrderFragment}
  ${DraftOrderLineItemFragment}
`;

const mutationUpdateDO = `
  mutation draftOrderUpdate($id: ID!, $input: DraftOrderInput!) {
    draftOrderUpdate(id: $id, input: $input) {
      draftOrder {
        ...DraftOrderDetailsFragment
      }
      userErrors {
        field
        message
      }
    }
  }

  ${draftOrderFragment}
  ${DraftOrderLineItemFragment}
`;

const mutationCalculateDO = `
  mutation draftOrderCalculate($input: DraftOrderInput!) {
    draftOrderCalculate(input: $input) {
      calculatedDraftOrder {
        lineItemsSubtotalPrice {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalDiscountsSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        totalTaxSet {
          shopMoney {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const mutationCalculateDOPerLines = `
  mutation draftOrderCalculate($input: DraftOrderInput!) {
    draftOrderCalculate(input: $input) {
      calculatedDraftOrder {
        acceptAutomaticDiscounts
        lineItems {
          ${DraftOrderLineItem}
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const queryGet = `
  query draftOrderById($id: ID!) {
    draftOrder(id: $id) {
      id
      name
      invoiceUrl
      taxLines {
        priceSet {
          shopMoney {
            amount
          }
        }
      }
      taxesIncluded
      order {
        id
        lineItems(first: 10) {
          nodes {
            id
            title
            quantity
            image {
              url
              altText
            }
            total: originalTotalSet {
              shopMoney {
                amount
              }
            }
          }
        }
      }
      subtotalPrice
      shippingLine {
        code
      }
    }
  }
`;

const createDraftOrder = async (input: draftOrderMutation) => {
  const { data, errors } = await shopify.request(
    mutationCreateDO,
    {
      variables: {
        hasDiscountsPermission: true,
        input: {
          ...input,
        }
      },
    }
  );

  return { data, errors }
}

const calculateDraftOrder = async (input: draftOrderMutation) => {
  const { data, errors } = await shopify.request(
    mutationCalculateDO,
    {
      variables: {
        hasDiscountsPermission: true,
        input: {
          ...input,
        }
      },
    }
  );

  return { data, errors }
}

const calculateDraftOrderPerLines = async (input: draftOrderMutation) => {
  const { data, errors } = await shopify.request(
    mutationCalculateDOPerLines,
    {
      variables: {
        hasDiscountsPermission: true,
        input: {
          ...input,
          acceptAutomaticDiscounts: true
        }
      },
    }
  );

  return { data, errors }
}

const updateDraftOrder = async (id: number, input: draftOrderMutation) => {
  const { data, errors } = await shopify.request(
    mutationUpdateDO,
    {
      variables: {
        id: `gid://shopify/DraftOrder/${id}`,
        hasDiscountsPermission: true,
        input: {
          ...input,
        }
      },
    }
  );

  return { data, errors }
}

const getDraftOrder = async (id: number) => {
  const { data, errors } = await shopify.request(queryGet, {
    variables: {
      id: `gid://shopify/DraftOrder/${id}`
    }
  });

  return { data, errors }
}

export {
  createDraftOrder,
  getDraftOrder,
  updateDraftOrder,
  calculateDraftOrder,
  calculateDraftOrderPerLines
}
