import { Button, Table } from 'antd';
import React, { useState } from 'react';

import Cell from './cellTable';

type EditableTableProps = Parameters<typeof Table>[0];

export interface DataType {
  key: number;
  sku: string;
  productName: string;
  variantName: string;
  quantity: number;
  price: string;
  category: string;
  net: string;
  tax: string;
  discount: string;
}

const defaultDataType = {
  sku: '',
  productName: '',
  variantName: '',
  quantity: 1,
  price: '0,00 €',
  category: '',
  net: '0,00 €',
  tax: '0,00 €',
  discount: '0,00 €'
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const nRows = 50;

const defaultData = () => {
  return Array(nRows)
    .fill({
      ...defaultDataType
    })
    .map((item, i) => ({ key: i, ...item }))
}

const OrderTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(defaultData());
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [count, setCount] = useState(nRows);

  const defaultColumns = [
    {
      title: 'SKU Shopify',
      dataIndex: 'sku',
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
      editable: true,
    },
    {
      title: 'PU',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'PU Net',
      dataIndex: 'net',
    },
    {
      title: 'Total HT',
      dataIndex: 'tax',
    },
    {
      title: 'Promo',
      dataIndex: 'discount',
    }
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      ...defaultDataType
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
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
        rowSelection={rowSelection}
        components={components}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
        pagination={{ pageSize: 40 }}
        scroll={{ x: 1500, y: 600 }}
      />
    </div>
  );
};

export default OrderTable;