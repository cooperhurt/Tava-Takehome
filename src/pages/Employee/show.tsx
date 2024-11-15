import React from 'react';
import { useParams } from 'react-router-dom';

export const EmployeeShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  document.title = `(${id}) Employee - Intitech`;

  return <h1>Employee Show Page</h1>;
};
