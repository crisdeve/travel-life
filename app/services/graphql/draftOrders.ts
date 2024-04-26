import { draftOrderMutation } from '../interfaces/orderAndLineItem';
import shopify from '../shopify.server'

const DraftOrderLineItemFragment = `
fragment DraftOrderLineItemFragment on DraftOrderLineItem {
  id
  appliedDiscount {
    amountSet {
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
    value
    valueType
    description
    __typename
  }
  isCustomLineItem: custom
  discountedTotalSet {
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
  discountedUnitPriceSet {
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
  image {
    id
    altText
    transformedSrc: url
    __typename
  }
  isGiftCard
  originalTotal
  originalUnitPriceSet {
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
  product {
    id
    title
    totalVariants
    __typename
  }
  quantity
  requiresShipping
  sku
  taxable
  title
  variantTitle
  variant {
    id
    __typename
  }
  weight {
    value
    unit
    __typename
  }
  __typename
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

const mutationCreate = `
  mutation draftOrderCreate($input: DraftOrderInput!) {
    draftOrderCreate(input: $input) {
      draftOrder {
        id
        createdAt
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const mutationPut = `
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

const mutationCalculate = `
  mutation draftOrderCalculate($input: DraftOrderInput!, $hasDiscountsPermission: Boolean = true) {
    draftOrderCalculate(input: $input) {
      calculatedDraftOrder {
        taxLines {
          priceSet {
            shopMoney {
              amount
            }
          }
        }
        lineItems {
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

const postDraftOrder = async (input: draftOrderMutation, calculate = false) => {
  const { data, errors } = await shopify.request(
    calculate ? mutationCalculate : mutationCreate,
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

const putDraftOrder = async (id: number, input: draftOrderMutation) => {
  const { data, errors } = await shopify.request(
    mutationPut,
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
  postDraftOrder,
  getDraftOrder,
  putDraftOrder
}
