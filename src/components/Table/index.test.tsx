import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Table } from './';
import { ColumnDef } from '@tanstack/react-table';
import { DEPARTMENT, Employee, EMPLOYEE_STATUS } from '../../types';


const mockData: Employee[] = [
  { id: 1, firstName: 'John', lastName: 'Doe', department:  DEPARTMENT.ENGINEERING, quote: "Not Today", status: EMPLOYEE_STATUS.ACTIVE, dateStarted: '01/01/2001', avatarUrl: '' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', department: DEPARTMENT.MANAGEMENT , quote: "Not Today", status: EMPLOYEE_STATUS.ACTIVE, dateStarted: '01/01/2001', avatarUrl: ''},
];

const mockColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
];

describe('Table Component', () => {
  test('renders table with data', () => {
    render(<Table<Employee> data={mockData} columns={mockColumns} />);

    // Check if table headers are rendered
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();

    // Check if table data is rendered
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Smith')).toBeInTheDocument();
    expect(screen.getByText('Management')).toBeInTheDocument();
  });

  test('calls onRowClick when a row is clicked', () => {
    const handleRowClick = jest.fn();
    render(<Table<Employee> data={mockData} columns={mockColumns} onRowClick={handleRowClick} />);

    // Simulate row click
    fireEvent.click(screen.getByText('John'));

    // Check if onRowClick is called
    expect(handleRowClick).toHaveBeenCalledWith(mockData[0]);
  });
});