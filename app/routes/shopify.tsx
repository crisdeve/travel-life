import { json } from "@remix-run/node";

import shopify from '../services/shopify.server'
const collectionId = '474700841239'

const data = `query {
  collection(id: "gid://shopify/Collection/${collectionId}") {
    products(first: 200) {
      nodes {
        id
        title 
        tags
        totalInventory
        tracksInventory
        featuredImage {
          url
        }
        prices: priceRangeV2 {          
          max: maxVariantPrice {
            amount
            currencyCode
          }
          min: minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
}`

export const loader = async () => {
  const product = await shopify.request(data)

  return json({ product })
};