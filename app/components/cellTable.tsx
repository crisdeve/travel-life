import { InputNumber } from 'antd';
import React, { createContext, useContext } from "react";

import { DataType } from './orderTable';
import ResourceSKU from "./resourceSKU";

export interface EditableCellProps {
  title?: React.ReactNode;
  editable?: boolean;
  children?: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
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