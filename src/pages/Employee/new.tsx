import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Employee } from '../../types';
import { Card } from '../../components/Card';
import { EmployeeForm } from './form';

export const EmployeeNew: React.FC = () => {
  const [employee, setEmployee] = useState<Partial<Employee>>();
  const navigate = useNavigate();
  document.title = `New Employee - Intitech`;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) =>
      prevEmployee ? { ...prevEmployee, [name]: value } : { [name]: value }
    );
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(employee, 'posting employee value is ');
    axios
      .post<{ message: string; newEmployee: Employee }>(
        `http://localhost:8080/api/employees`,
        employee
      )
      .then(({ data }) => {
        const {
          newEmployee: { id },
        } = data;
        navigate(`/employees/${id}`);
      })
      .catch((error) => {
        console.log(error, 'ERROR: Error occurred saving employee');
      });
  };

  const handleCancel = () => {
    navigate(`/employees`);
  };

  return (
    <Card>
      <h1>New Employee</h1>
      <EmployeeForm
        employee={employee}
        handleInputChange={handleInputChange}
        handleCancel={handleCancel}
        handleSave={handleSave}
      />
    </Card>
  );
};
