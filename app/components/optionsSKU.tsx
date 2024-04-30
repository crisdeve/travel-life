import { Spin } from "antd";

import { ResultItem } from "./resourceSKU";

export interface Options {
  value: unknown,
  label: unknown
}

interface OptionSKU {
  i: number;
  sku: string;
  productName: string;
  variantName: string;
  price: string;
}

const renderItem = ({ i, sku, productName, variantName, price }: OptionSKU) => (
  <div key={i}>
    {sku} - {productName} - {variantName} - {price}
  </div>
);

const optionsSKU = (state: string, results: any): Options[] => {
  if (state === 'loading' || !results) return [{ value: '', label: <Spin />}];
  
  return (
    results.map((item: ResultItem, i: number) => ({
      value: item.node.sku,
      label: renderItem({ 
        i,
        sku: item.node.sku,
        productName: item.node.product.title,
        variantName: item.node.title,
        price: item.node.price
       })
    }))
  )
}

export default optionsSKU