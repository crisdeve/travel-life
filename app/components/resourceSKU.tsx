import { useFetcher } from "@remix-run/react";
import { AutoComplete, Empty } from "antd";
import { debounce } from "lodash"
import { useEffect, useState } from "react";

import { useCellContext } from "./cellTable";
import optionsSKU, { Options } from "./optionsSKU";

export interface ProductVariant {
  product: { title: string };
  title: string;
  sku: string;
  price: string;
}

export interface ResultItem {
  node : ProductVariant
}

const strToCurrency = (str: string, currency = 'EUR') => {
  return Number(str).toLocaleString(
  'de-DE',
  {
    style: "currency",
    currency
  })
}

const ResourceSKU = () => {
  const { record, handleSave } = useCellContext()
  const search = useFetcher()

  const [results, setResults] = useState<any>([])
  const [options, setOptions] = useState<Options[]>([])
  
  const selectedItem = (sku: string) => {
    const result = results.find((item: ResultItem) => item.node.sku === sku)
  
    if (!result) return;
    
    const { node } = result;
    
    const newRecord = {
      ...record,
      sku: node.sku,
      productName: node.product.title,
      variantName: node.title,
      price: strToCurrency(node.price),
      category: 'Default Collection',
      net: strToCurrency(`${Number(node.price) * 0.8}`),
      tax: strToCurrency(`${Number(node.price) * 0.2}`),
      discount: strToCurrency('0')
    }

    handleSave(newRecord)
  }

  useEffect(() => {
    if (search.state === "loading" || !search.data) return;

    if (search.data) {
      const resultsOptions = search.data || []
  
      setResults(resultsOptions)
      setOptions(optionsSKU(search.state, resultsOptions))
    }

  }, [search, search.state])

  const onSearch = (text: string) => {
    setOptions(optionsSKU('loading', []))
    search.load(`/api/variants/get?sku=${text}`);
  }

  const debounceSearch = debounce(onSearch, 1000)

  return (
    <search.Form method="get" action="/api/variants/get">
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={500}
        style={{ width: 100 }}
        options={options}
        onSearch={debounceSearch}
        onSelect={selectedItem}
        size="large"
        placeholder="Shopify SKU"
        notFoundContent={
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{ height: 60 }}
            description={false}
          />
        }
      />
    </search.Form>
  )
}

export default ResourceSKU