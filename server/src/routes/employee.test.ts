import request from 'supertest';
import express from 'express';
import employeesRouter from './employees'; 
import { DEPARTMENT } from '../../../src/types';

const app = express();
app.use(express.json());
app.use('/employees', employeesRouter);

describe('Employees API', () => {
  test('GET /employees - should return all employees', async () => {
    const response = await request(app).get('/employees');
    expect(response.status).toBe(200);
    expect(response.body.employees).toBeDefined();
    expect(Array.isArray(response.body.employees)).toBe(true);
  });

  test('GET /employees/type/:employeeDepartment - should return employees of a specific department', async () => {
    const department = DEPARTMENT.ENGINEERING;
    const response = await request(app).get(`/employees/type/${department}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((employee: any) => {
      expect(employee.department).toBe(department);
    });
  });

  test('GET /employees/aggregated - should return aggregated employees by department', async () => {
    const response = await request(app).get('/employees/aggregated');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe('object');
    Object.values(response.body).forEach((employees) => {
      expect(Array.isArray(employees)).toBe(true);
    });
  });
});