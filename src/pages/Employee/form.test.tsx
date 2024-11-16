import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EmployeeForm } from './form';
import { DEPARTMENT, EMPLOYEE_STATUS, Employee } from '../../types';

const mockEmployee: Partial<Employee> = {
  firstName: 'John',
  lastName: 'Doe',
  dateStarted: '2023-01-01T00:00:00',
  department: DEPARTMENT.ENGINEERING,
  quote: 'This is a test quote',
  status: EMPLOYEE_STATUS.ACTIVE,
};

describe('Form Component', () => {
  test('renders form fields correctly', () => {
    render(
      <EmployeeForm
        employee={mockEmployee}
        handleSave={() => Promise.resolve()}
        handleInputChange={(e) => null}
        handleCancel={() => null}
      />
    );

    // Check if form fields are rendered with correct values
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue(DEPARTMENT.ENGINEERING)).toBeInTheDocument();
    expect(screen.getByDisplayValue(EMPLOYEE_STATUS.ACTIVE)).toBeInTheDocument();
    expect(screen.getByDisplayValue('This is a test quote')).toBeInTheDocument();
  });

  test('handles input changes correctly', () => {
    const onInputchange = jest.fn();

    render(
      <EmployeeForm
        employee={mockEmployee}
        handleSave={() => Promise.resolve()}
        handleInputChange={onInputchange}
        handleCancel={() => null}
      />
    );

    // Simulate input change
    fireEvent.change(screen.getByTestId('firstNameInput'), {
      target: { value: 'Jane' },
    });
    fireEvent.change(screen.getByTestId('lastNameInput'), {
      target: { value: 'Smith' },
    });

    expect(onInputchange).toHaveBeenCalledTimes(2)
  });

  test('handles form submission correctly', () => {
    const handleSubmit = jest.fn();
    const handleSubmitEvent = jest.fn((e) => e.preventDefault());

    render(
      <EmployeeForm
        employee={mockEmployee}
        handleSave={handleSubmit}
        handleInputChange={(e) => null}
        handleCancel={() => null}
      />
    );

    // Simulate form submission
    const form = screen.getByTestId('employeeForm');
    form.onsubmit = handleSubmitEvent;

    // Simulate form submission
    fireEvent.submit(form);

    // Check if handleSubmit is called
    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmitEvent).toHaveBeenCalled();
  });
});
