import express from 'express';
import { camelCase } from 'lodash';
import { data as employees } from '../../data';
import { Employee } from '../../../src/types';
const router = express.Router();

interface AggregatedEmployees {
  [key: string]: Employee[]; // Key is a string (employee type), and value is an array of Employee objects
}

// This is recommended to
router.route('/').get(async (req, res) => {
  return res.status(200).json({ employees });
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  console.log(id, 'id is');

  const employee = employees.find((emp) => emp.id === Number(id));
  console.log(employee, 'id is');

  return res.status(200).json({ employee });
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

export default router;
