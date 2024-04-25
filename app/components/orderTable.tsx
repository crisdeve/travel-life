import { Table } from 'antd';
import React, { useState } from 'react';

import EditableCell from './EditableCell';

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  sku: string;
  productName: string;
  variantName: string,
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

const DATA = [
  {
    key: 1,
    sku: '232423432',
    productName: 'Carro',
    variantName: 'Rojo',
  },
  {
    key: 2,
    sku: '102423432',
    productName: 'Carro',
    variantName: 'Verde',
  },
]

const OrderTable: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(DATA);
  /* const [count, setCount] = useState(2); */

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
    }
  ];

  /* const handleAdd = () => {
    const newData: DataType = {
      key: count,
      sku: '',
      productName: '',
      variantName: '',
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  }; */

  /* const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  }; */

  const components = {
    body: {
      cell: EditableCell,
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
        onClick: (e) => console.log({e, record})
      }),
    };
  });

  return (
    <div>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};

export default OrderTable;