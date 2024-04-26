import { useFetcher } from "@remix-run/react";
import { Input, Popover } from "antd";
import { useEffect, useState } from "react";

import { useCellContext } from "./cell";
import SearchContent from "./searchContent";

const ResourceSKU = () => {
  const { dataIndex, record, handleSave } = useCellContext();
  const [results, setResults] = useState([])
  
  const search = useFetcher();

  const [field, setField] = useState(record[dataIndex])
  const [activeSearch, setActiveSearch] = useState(false)

  const selectedItem = (data) => {
    const newRecord = {
      ...record,
      sku: data.sku,
      productName: data.product.title,
      variantName: data.title,
      price: `$${data.price}`,
    }

    handleSave(newRecord)
    setActiveSearch(false)
    setField(data.sku)
  }

  const onChange = (e) => {
    setField(e.target.value)
    search.load(`/api/variants/get?sku=${e.target.value}`);
  }

  const handleOpenChange = (newOpen: boolean) => {
    setActiveSearch(newOpen);
  };

  useEffect(() => {
    if (search.state === "loading") return;

    if (search.data) {
      setResults(search.data.data.productVariants.edges)
    }

  }, [search.state])

  return (
    <search.Form method="get" action="/api/variants/get">
      <Popover
        content={
          <SearchContent
            state={search.state}
            results={results}
            selectedItem={selectedItem}
          />
        }
        title="Title"
        trigger="click"
        open={activeSearch}
        onOpenChange={handleOpenChange}
      >
        <Input
          value={field}
          onChange={onChange}
          placeholder="Shopify SKU"
        />
      </Popover>
    </search.Form>
  )
}

export default ResourceSKU