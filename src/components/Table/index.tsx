import React, { useState } from 'react';
import {
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table';
import styled from 'styled-components';

// We should use Generics here but tsconfig is off TableComponentProps<T extends object>
interface TableComponentProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[]; // Columns are based on the generic type TData
  onRowClick?: (row: T) => void;
}

// Table and Filter Styles
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;

  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #eceff1;
    color: #333;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  tr:hover {
    background-color: #f0f0f0;
  }

  tr[data-clickable='true']:hover {
    cursor: pointer;
  }
`;

const FilterInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 10px;
  font-size: 0.9em;
`;

// This should be proper generic but something with TS is off <T extends object>({ data, columns, onRowClick }: TableComponentProps<T>)
export const Table = <T extends object>({
  data,
  columns,
  onRowClick,
}: TableComponentProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Set up the table with filtering
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Handle change in filter inputs
  const handleFilterChange = (columnId: string, value: string) => {
    setColumnFilters((prev) => {
      // Find existing filter
      const existingFilter = prev.find((filter) => filter.id === columnId);

      // Update or add filter
      if (existingFilter) {
        return prev.map((filter) =>
          filter.id === columnId ? { ...filter, value } : filter
        );
      } else {
        return [...prev, { id: columnId, value }];
      }
    });
  };

  return (
    <StyledTable>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                <FilterInput
                  placeholder={`Filter by ${header.column.columnDef.header}`}
                  // NOTE: We should be casting as a string here but TS is off
                  value={
                    (columnFilters.find((filter) => filter.id === header.id)
                      ?.value as string) || ''
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    handleFilterChange(header.id, e.target.value);
                  }}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            data-clickable={!!onRowClick}
            onClick={() => onRowClick && onRowClick(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};
