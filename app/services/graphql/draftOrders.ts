import { draftOrderMutation } from '../interfaces/orderAndLineItem';
import shopify from '../shopify.server'

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

const mutationCalculate = `
  mutation draftOrderCalculate($input: DraftOrderInput!) {
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

const query = `
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
        input: {
          ...input,
        }
      },
    }
  );

  return { data, errors }
}

const getDraftOrder = async (id: number) => {
  const { data, errors } = await shopify.request(query, {
    variables: {
      id: `gid://shopify/DraftOrder/${id}`
    }
  });

  return { data, errors }
}


export { postDraftOrder, getDraftOrder }