/* const data = {
  "appliedDiscount": {
    "amount": "100.57",
    "description": "<your-description>",
    "title": "<your-title>",
    "value": 1.1,
    "valueType": "FIXED_AMOUNT"
  },
  "billingAddress": {
    "address1": "<your-address1>",
    "address2": "<your-address2>",
    "city": "<your-city>",
    "company": "<your-company>",
    "country": "<your-country>",
    "countryCode": "AC",
    "firstName": "<your-firstName>",
    "id": "gid://shopify/<objectName>/10079785100",
    "lastName": "<your-lastName>",
    "phone": "<your-phone>",
    "province": "<your-province>",
    "provinceCode": "<your-provinceCode>",
    "zip": "<your-zip>"
  },
  "customAttributes": [
    {
      "key": "<your-key>",
      "value": "<your-value>"
    }
  ],
  "email": "<your-email>",
  "lineItems": [
    {
      "appliedDiscount": {
        "amount": "100.57",
        "description": "<your-description>",
        "title": "<your-title>",
        "value": 1.1,
        "valueType": "FIXED_AMOUNT"
      },
      "customAttributes": [
        {
          "key": "<your-key>",
          "value": "<your-value>"
        }
      ],
      "grams": 1,
      "originalUnitPrice": "100.57",
      "quantity": 1,
      "requiresShipping": true,
      "sku": "<your-sku>",
      "taxable": true,
      "title": "<your-title>",
      "variantId": "gid://shopify/<objectName>/10079785100",
      "weight": {
        "unit": "GRAMS",
        "value": 1.1
      }
    }
  ],
  "localizationExtensions": [
    {
      "key": "SHIPPING_CREDENTIAL_BR",
      "value": "<your-value>"
    }
  ],
  "marketRegionCountryCode": "AC",
  "metafields": [
    {
      "description": "<your-description>",
      "id": "gid://shopify/<objectName>/10079785100",
      "key": "<your-key>",
      "namespace": "<your-namespace>",
      "type": "<your-type>",
      "value": "<your-value>"
    }
  ],
  "note": "<your-note>",
  "paymentTerms": {
    "paymentSchedules": [
      {
        "dueAt": "2019-09-07T15:50:00Z",
        "issuedAt": "2019-09-07T15:50:00Z"
      }
    ],
    "paymentTermsTemplateId": "gid://shopify/<objectName>/10079785100"
  },
  "phone": "<your-phone>",
  "poNumber": "<your-poNumber>",
  "presentmentCurrencyCode": "AED",
  "purchasingEntity": {
    "customerId": "gid://shopify/<objectName>/10079785100",
    "purchasingCompany": {
      "companyContactId": "gid://shopify/<objectName>/10079785100",
      "companyId": "gid://shopify/<objectName>/10079785100",
      "companyLocationId": "gid://shopify/<objectName>/10079785100"
    }
  },
  "reserveInventoryUntil": "2019-09-07T15:50:00Z",
  "shippingAddress": {
    "address1": "<your-address1>",
    "address2": "<your-address2>",
    "city": "<your-city>",
    "company": "<your-company>",
    "country": "<your-country>",
    "countryCode": "AC",
    "firstName": "<your-firstName>",
    "id": "gid://shopify/<objectName>/10079785100",
    "lastName": "<your-lastName>",
    "phone": "<your-phone>",
    "province": "<your-province>",
    "provinceCode": "<your-provinceCode>",
    "zip": "<your-zip>"
  },
  "shippingLine": {
    "price": "100.57",
    "shippingRateHandle": "<your-shippingRateHandle>",
    "title": "<your-title>"
  },
  "sourceName": "<your-sourceName>",
  "tags": [
    "<your-tags>"
  ],
  "taxExempt": true,
  "useCustomerDefaultAddress": true,
  "visibleToCustomer": true
} */

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
  email: string;
  lineItems: lineItem[];
  appliedDiscount?: appliedDiscount;
}


export type {
  draftOrderMutation,
  lineItem,
  appliedDiscount
}