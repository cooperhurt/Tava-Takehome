import express from 'express';
import { camelCase } from 'lodash';
import { data as employees } from '../../data';
import { Employee } from '../../../src/types';
import Joi from 'joi';

const router = express.Router();

interface AggregatedEmployees {
  [key: string]: Employee[];
}

const employeeSchema = Joi.object<Employee>({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateStarted: Joi.date().required(),
  department: Joi.string().required(),
  quote: Joi.string().optional(),
  status: Joi.string().required(),
});

router.route('/').get(async (req, res) => {
  return res.status(200).json({ employees });
});

router.route('/type/:employeeDaprment').get(async (req, res) => {
  const { employeeDaprment } = req.params;
  const filteredEmployees = employees.filter(
    (employee) => employee.department === employeeDaprment
  );
  res.json(filteredEmployees);
});

router.route('/aggregated').get(async (req, res) => {
  const aggregatedEmployees: AggregatedEmployees = employees.reduce(
    (acc, employee) => {
      const serverDeparmentValue = camelCase(employee.department);
      if (!acc[serverDeparmentValue]) {
        acc[serverDeparmentValue] = [];
      }
      acc[serverDeparmentValue].push(employee);
      return acc;
    },
    {} as AggregatedEmployees
  );

  res.json(aggregatedEmployees);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;

  const employee = employees.find((emp) => emp.id === Number(id));

  return res.status(200).json({ employee });
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const updatedEmployee: Partial<Employee> = req.body;

  const employeeIndex = employees.findIndex((emp) => emp.id === Number(id));
  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  const employee = employees[employeeIndex];
  const updatedEmployeeData = { ...employee, ...updatedEmployee };

  employees[employeeIndex] = updatedEmployeeData;

  return res.status(200).json({
    message: 'Employee updated successfully',
    employee: updatedEmployeeData,
  });
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;

  const employeeIndex = employees.findIndex((emp) => emp.id === Number(id));
  if (employeeIndex === -1) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  employees.splice(employeeIndex, 1);

  return res.status(200).json({
    message: 'Employee deleted successfully',
  });
});

router.route('/').post(async (req, res) => {
  // Validates the body matches the required attributes of Employee Type
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error });
  }
  const employee = req.body as Partial<Employee>;

  const newEmployee = {
    id: Math.floor(Math.random() * 100),
    ...employee,
  } as Employee;
  employees.push(newEmployee);

  return res.status(200).json({
    message: 'Employee deleted successfully',
    newEmployee,
  });
});

export default router;
