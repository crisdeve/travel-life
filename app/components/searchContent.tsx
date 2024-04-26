import { Avatar, List } from "antd"
import React from "react";

interface SearchContentProps {
  state: string;
  results: any;
  selectedItem: () => void
}

const SearchContent: React.FC<SearchContentProps> = ({ state, results, selectedItem }) => {
  return (
    <>
      {state === 'loading'
        ? state
        : <List
            itemLayout="horizontal"
            dataSource={results}
            renderItem={(item) => {
              const { node } = item
              return (
                <List.Item onClick={() => selectedItem({ ...node })}>
                  <List.Item.Meta
                    avatar={<Avatar src={node.product.featuredImage.url} />}
                    title={
                      <span>{node.sku}</span>
                    }
                    description={
                      <span>{node.product.title} - {node.title}</span>
                    }
                  />
                </List.Item>
              )
          }}
        />
          
      }
    </>
  )
}

export default SearchContent