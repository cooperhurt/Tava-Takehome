import React from 'react';
import { useParams } from 'react-router-dom';

export const EmployeeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  document.title = `Edit (${id}) Employee - Intitech`;

  return <h1>Employee Edit Page</h1>;
};
