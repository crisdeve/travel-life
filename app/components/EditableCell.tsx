import { Input } from "antd";
import React, { useState } from "react";

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const InputField = ({ value }) => {
  const [field, setField] = useState(value)
  const [activeSearch, setActiveSearch] = useState(false)

  return (
    <>
      <Input
        value={field}
        onChange={(e) => {
          setField(e.target.value)
        }}
        onFocus={() => {
          setActiveSearch(true)
        }}
        onBlur={() => {
          setActiveSearch(false)
        }}
      />

      {activeSearch ? 'ok' : null}
    </>
  )
}

const EditableCell: React.FC<EditableCellProps> = ({
  editable,
  children,
  dataIndex,
  record,
  ...restProps
}) => {
  return (
    <td {...restProps}>
      {
      editable
        ? <InputField value={record[dataIndex]} />
        : children
      }
    </td>
  );
};

export default EditableCell;