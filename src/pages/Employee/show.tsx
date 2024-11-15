import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Employee, EMPLOYEE_STATUS } from '../../types';
import { Card } from '../../components/Card';

const ProfileDetail = styled.div`
  margin-bottom: 10px;
  font-size: 1.1em;
  color: #333;
`;

const ProfileLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;

  &[data-action='edit'] {
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  }

  &[data-action='delete'] {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
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

export const EmployeeShow: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  document.title = `(${id}) Employee - Intitech`;

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/employees/${id}`)
      .then(({ data }) => {
        const { employee } = data;
        setEmployee(employee);
      })
      .catch((error) => {
        console.log(error, 'ERROR: Error occurred fetching employee');
      });
  }, [id]);

  const formattedEmployeeName = `${employee?.firstName} ${employee?.lastName}`;

  const confirmAndDeleteEmployee = () => {
    axios
      .delete(`http://localhost:8080/api/employees/${id}`)
      .then(({ data }) => {
        navigate('/employees');
      })
      .catch((error) => {
        console.log(error, 'ERROR: Error occurred fetching employee');
      });
  };

  if (!employee) {
    return <LoadingIndicator />;
  }

  return (
    <Card>
      <h1>
        ({id}) {formattedEmployeeName}
      </h1>
      <ProfileDetail>
        <ProfileLabel>Name:</ProfileLabel> {formattedEmployeeName}
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Start Date:</ProfileLabel> {employee.dateStarted}
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Department:</ProfileLabel> {employee.department}
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Favorite Quote:</ProfileLabel> {employee.quote}
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Status:</ProfileLabel>{' '}
        <StatusBadge $status={employee.status}>
          {employee.status.toUpperCase()}
        </StatusBadge>
      </ProfileDetail>
      <ButtonContainer>
        <Button
          data-action="edit"
          onClick={() => navigate(`/employees/${id}/edit`)}
        >
          Edit
        </Button>
        <Button data-action="delete" onClick={confirmAndDeleteEmployee}>
          Delete
        </Button>
      </ButtonContainer>
    </Card>
  );
};
