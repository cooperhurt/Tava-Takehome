import React from 'react';
import styled from 'styled-components';
import { DEPARTMENT, Employee, EMPLOYEE_STATUS } from '../../types';
import { Button } from '../../components/Button';

const ProfileDetail = styled.div`
  margin-bottom: 10px;
  font-size: 1.1em;
  color: #333;
`;

const ProfileLabel = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

interface IEmployeeFormProps {
  handleSave: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  employee?: Partial<Employee>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleCancel: () => void;
}

export const EmployeeForm: React.FC<IEmployeeFormProps> = ({
  handleSave,
  employee,
  handleInputChange,
  handleCancel,
}) => {
  return (
    <form onSubmit={handleSave} data-testid="employeeForm">
      <ProfileDetail>
        <ProfileLabel>First Name:</ProfileLabel>
        <Input
          data-testid="firstNameInput"
          type="text"
          name="firstName"
          value={employee?.firstName}
          onChange={handleInputChange}
          required
        />
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Last Name:</ProfileLabel>
        <Input
          data-testid="lastNameInput"
          type="text"
          name="lastName"
          value={employee?.lastName}
          onChange={handleInputChange}
          required
        />
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Started Date:</ProfileLabel>
        <Input
          type="datetime-local"
          name="dateStarted"
          value={employee?.dateStarted}
          onChange={handleInputChange}
          required
        />
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Department:</ProfileLabel>
        <Select
          name="department"
          value={employee?.department}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Department</option>
          {Object.values(DEPARTMENT).map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </Select>
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Favorite Quote:</ProfileLabel>
        <Input
          type="text"
          name="quote"
          value={employee?.quote}
          onChange={handleInputChange}
          required
        />
      </ProfileDetail>
      <ProfileDetail>
        <ProfileLabel>Status:</ProfileLabel>
        <Select
          name="status"
          value={employee?.status}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Status</option>
          {Object.values(EMPLOYEE_STATUS).map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </ProfileDetail>
      <ButtonContainer>
        <Button data-testid="submitButton" data-action="save" type="submit">
          Save
        </Button>
        <Button data-action="cancel" type="button" onClick={handleCancel}>
          Cancel
        </Button>
      </ButtonContainer>
    </form>
  );
};
