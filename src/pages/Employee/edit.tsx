import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Employee } from '../../types';
import { Card } from '../../components/Card';
import { EmployeeForm } from './form';

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

export const EmployeeEdit: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  document.title = `Edit Employee (${id}) - Intitech`;

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) =>
      prevEmployee ? { ...prevEmployee, [name]: value } : null
    );
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:8080/api/employees/${id}`, employee)
      .then(() => {
        navigate(`/employees/${id}`);
      })
      .catch((error) => {
        console.log(error, 'ERROR: Error occurred saving employee');
      });
  };

  const handleCancel = () => {
    navigate(`/employees/${id}`);
  };

  if (!employee) {
    return <LoadingIndicator />;
  }

  return (
    <Card>
      <h1>Edit Employee ({id})</h1>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </Card>
  );
};
