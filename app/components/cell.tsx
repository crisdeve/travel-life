import { InputNumber } from 'antd';
import React, { createContext, useContext } from "react";

import ResourceSKU from "./resourceSKU";

export interface Item {
  key: string;
  sku: string;
  productName: string;
  variantName: string;
  quantity: number;
  price: string;
}

export interface EditableCellProps {
  title?: React.ReactNode;
  editable?: boolean;
  children?: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export const CellContext = createContext<EditableCellProps | null>(null);

export const useCellContext = () => {
  const cellContext = useContext(CellContext);

  if (!cellContext) {
    throw new Error(
      "useCellContext has to be used within <CellContext.Provider>"
    );
  }

  return cellContext;
}

const Cell: React.FC<EditableCellProps> = ({
  editable,
  children,
  dataIndex,
  record,
  handleSave
}) => {  
  
  /* const onChange = (value) => {
    console.log('changed', value);
  } */

  return (
    <CellContext.Provider value={{ editable, dataIndex, record, handleSave }}>
      <td>
        {editable
          ? dataIndex === 'quantity'
            ? <InputNumber min={1} defaultValue={1} />
            : <ResourceSKU />
          : children
        }
      </td>
    </CellContext.Provider>
  );
};

export default Cell;