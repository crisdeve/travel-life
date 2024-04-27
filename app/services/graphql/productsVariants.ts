import shopify from '../shopify.server'

const queryGetSku = `
  query productVariantsByQuery($query: String) {
    productVariants(first: 3, query: $query) {
      edges {
        node {
          sku
          id
          title
          image {
            url
          }
          price
          product {
            title
            featuredImage {
              url
            }
          }
        }
      }
    }
  }
`;

const queryFirstTen = `
  query {
    productVariants(first: 3) {
      edges {
        node {
          sku
          id
          title
          image {
            url
          }
          price
          product {
            title
            featuredImage {
              url
            }
          }
        }
      }
    }
  }
`

const getProductsByQuery = async (id: string) => {
  const { data, errors } = await shopify.request(queryGetSku, {
    variables: {
      query: `${id}*`
    }
  });

  return { data, errors }
}

const getFirstVariants = async () => {
  const { data, errors } = await shopify.request(queryFirstTen);

  return { data, errors }
}

export {
  getProductsByQuery,
  getFirstVariants
}