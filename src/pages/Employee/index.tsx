import React, { useEffect, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '../../components/Table';
import { Card } from '../../components/Card';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Employee, EMPLOYEE_STATUS } from '../../types';
import axios from 'axios';
import { Button } from '../../components/Button';

const StyledCardList = styled.div`
  display: flex;
  flex-direction: column; /* Or row, depending on your layout */
  gap: 20px;
`;

interface IStatusBadgeProps {
  $status: EMPLOYEE_STATUS;
}

const StatusBadge = styled.span<IStatusBadgeProps>`
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.9em;
  color: white;
  background-color: ${({ $status }) =>
    $status === 'active' ? 'green' : 'orange'};
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const NameCell = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddEmployeeButton = styled(Button)`
  margin-left: auto;
`;

const employeeColumns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'firstName',
    header: 'Name',
    cell: ({ row }) => (
      <NameCell>
        <Avatar src={row.original.avatarUrl} alt="Avatar" loading="lazy" />
        {`${row.original.firstName} ${row.original.lastName}`}
      </NameCell>
    ),
  },
  { accessorKey: 'dateStarted', header: 'Started Date' },
  { accessorKey: 'quote', header: 'Quote' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (cell) => (
      <StatusBadge $status={cell.getValue<EMPLOYEE_STATUS>()}>
        {cell.getValue<EMPLOYEE_STATUS>().toUpperCase()}
      </StatusBadge>
    ),
  },
];

export const EmployeePage: React.FC = () => {
  document.title = 'Employees - Intitech';

  const [managmentEmployees, setManagmentEmployees] = useState<Employee[]>([]);
  const [engineeringEmployees, setEngineeringEmployees] = useState<Employee[]>(
    []
  );
  const [operationEmployees, setOperationEmployees] = useState<Employee[]>([]);
  const [foodServiceEmployees, setFoodServiceEmployees] = useState<Employee[]>(
    []
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/employees/aggregated')
      .then(({ data }) => {
        const {
          engineering = [],
          management = [],
          operations = [],
          foodServices = [],
        } = data;

        setManagmentEmployees(management);
        setEngineeringEmployees(engineering);
        setOperationEmployees(operations);
        setFoodServiceEmployees(foodServices);
      })
      .catch((error) => {
        console.log(error, 'ERROR: Error occured fetching employees');
      });
  }, []);

  const handleEmployeeRowClick = (employee: Employee) =>
    navigate(`/employees/${employee.id}`);

  return (
    <StyledCardList>
      <StyledHeader>
        <h1>Employee's</h1>
        <AddEmployeeButton
          data-action="new"
          onClick={() => navigate('/employees/new')}
        >
          Add Employee
        </AddEmployeeButton>
      </StyledHeader>
      <Card>
        <h3>Managment Employee's</h3>
        <Table
          data={managmentEmployees}
          columns={employeeColumns}
          onRowClick={handleEmployeeRowClick}
        />
      </Card>
      <Card>
        <h3>Engineer Employee's</h3>
        <Table
          data={engineeringEmployees}
          columns={employeeColumns}
          onRowClick={handleEmployeeRowClick}
        />
      </Card>

      <Card>
        <h3>Operation Employee's</h3>
        <Table
          data={operationEmployees}
          columns={employeeColumns}
          onRowClick={handleEmployeeRowClick}
        />
      </Card>
      <Card>
        <h3>Food Service Employee's</h3>
        <Table
          data={foodServiceEmployees}
          columns={employeeColumns}
          onRowClick={handleEmployeeRowClick}
        />
      </Card>
    </StyledCardList>
  );
};
