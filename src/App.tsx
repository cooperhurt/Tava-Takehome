import "./styles.css";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";
import Payroll from "./Payroll";
import logo from "./assets/logo.png";

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        <div>
          <NavLink to="/payroll">Payroll</NavLink>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/payroll" element={<Payroll />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
