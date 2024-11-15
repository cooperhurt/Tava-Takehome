import './styles.css';
import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import logo from './assets/logo.png';
import styled from 'styled-components';
import { PayrollPage } from './pages/Payroll';
import { EmployeePage } from './pages/Employee';
import { EmployeeShow } from './pages/Employee/show';
import { EmployeeEdit } from './pages/Employee/edit';
import { HomePage } from './pages/Home';
import { EmployeeNew } from './pages/Employee/new';

const StyledNavLink = styled(NavLink)`
  display: block;
  align-items: center;
  color: black;
  padding: 6px;
  border-radius: 3px;
  transition: background-color 0.3s;
  padding: 10px 10px;
  text-decoration: none;

  &.active {
    color: white;
    background-color: red;
    font-weight: bold;
  }

  &:not(.active):hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const StyledNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

const StyledMain = styled.main`
  padding: 32px;
`;

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <StyledNavList>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="payroll">Payroll</StyledNavLink>
          <StyledNavLink to="/employees">Employees</StyledNavLink>
        </StyledNavList>
      </nav>
      <StyledMain>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/employees/new" element={<EmployeeNew />} />
          <Route path="/employees/:id" element={<EmployeeShow />} />
          <Route path="/employees/:id/edit" element={<EmployeeEdit />} />
        </Routes>
      </StyledMain>
    </BrowserRouter>
  );
};
