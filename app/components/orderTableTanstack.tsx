import { useReactTable } from "@tanstack/react-table";
import { useState } from "react";

import EditableCell from "./cellTable";

const DATA = [
  {
    sku: '232423432',
    productName: 'Carro Rojo',
  },
  {
    sku: '102423432',
    productName: 'Carro Verde',
  },
]

const columns = [
  {
    accessorKey: 'sku',
    header: 'SKU Shopify',
    cell: ({ getValue }) => <EditableCell value={getValue()} />,
  },
  {
    accessorKey: 'productName',
    header: 'Désignation',
    cell: ({ getValue }) => <p>{ getValue() }</p>,
  }
]

const TableTanstack = ({  }) => {
  const [data, setData] = useState(DATA)

  const table = useReactTable({
    data,
    columns
  });

  console.log(table.getHeaderGroups());
  
  return (
    <p>TERMINAL</p>
  )
}

export default TableTanstack;