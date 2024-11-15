import React, { useState } from 'react';
import {
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
  getSortedRowModel,
  SortingState,
} from '@tanstack/react-table';
import styled from 'styled-components';

interface TableComponentProps<T extends object> {
  data: T[];
  columns: ColumnDef<T, any>[];
  onRowClick?: (row: T) => void;
}

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

export const Table = <T extends object>({
  data,
  columns,
  onRowClick,
}: TableComponentProps<T>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleFilterChange = (columnId: string, value: string) => {
    setColumnFilters((prev) => {
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

  // Handle sorting when column headers are clicked
  const handleSort = (columnId: string) => {
    setSorting((prev) => {
      const existingSort = prev.find((sort) => sort.id === columnId);
      if (existingSort) {
        // Toggle sort direction
        return prev.map((sort) =>
          sort.id === columnId ? { ...sort, desc: !sort.desc } : sort
        );
      } else {
        // Add new sort
        return [...prev, { id: columnId, desc: false }];
      }
    });
  };

  return (
    <StyledTable>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} onClick={() => handleSort(header.id)}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
                {header.column.getIsSorted()
                  ? header.column.getIsSorted() === 'desc'
                    ? ' 🔽'
                    : ' 🔼'
                  : ''}
                <FilterInput
                  placeholder={`Filter by ${header.column.columnDef.header}`}
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
