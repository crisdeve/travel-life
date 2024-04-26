import { Button, Table } from 'antd';
import React, { useState } from 'react';

import Cell from './cell';

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  sku: string;
  productName: string;
  variantName: string;
  quantity: number;
  price: string;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const nRows = 5;

const defaultData = () => {
  return Array(nRows)
    .fill({
      sku: '',
      productName: '',
      variantName: '',
      quantity: 1,
      price: '$0,00',
    })
    .map((item, i) => ({ key: i, ...item }))
}

const OrderTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(defaultData());
  const [count, setCount] = useState(nRows);

  const defaultColumns = [
    {
      title: 'SKU Shopify',
      dataIndex: 'sku',
      width: '30%',
      editable: true,
    },
    {
      title: 'Désignation',
      dataIndex: 'productName',
    },
    {
      title: 'Déclinaison',
      dataIndex: 'variantName',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width: '5%',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
    }
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      sku: '',
      productName: '',
      variantName: '',
      quantity: 1,
      price: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      cell: Cell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      }),
    };
  });

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Ajouter une ligne
      </Button>
      
      <Table
        components={components}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default OrderTable;