export enum DEPARTMENT {
  FOOD_SERVICES = 'Food Services',
  OPERATIONS = 'Operations',
  MANAGEMENT = 'Management',
  ENGINEERING = 'Engineering',
}

export enum EMPLOYEE_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  department: DEPARTMENT;
  dateStarted: string;
  quote: string;
  status: EMPLOYEE_STATUS;
  avatarUrl: string;
}
