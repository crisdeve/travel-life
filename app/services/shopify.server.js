/* eslint-disable no-undef */
import { createAdminApiClient } from '@shopify/admin-api-client';

const client = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_STORE,
  apiVersion: '2023-07',
  accessToken: process.env.SHOPIFY_TOKEN,
});

export default client;
