import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Employee } from '../../types';

export const EmployeeShow: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>();
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
        console.log(error, 'ERROR: Error occured fetching employees');
      });
  }, [id]);

  return <h1>Employee Show Page</h1>;
};
