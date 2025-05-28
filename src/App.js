import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage"
import LoginPage from "./Components/LoginPage"
import RegisterPage from "./Components/RegisterPage"
import Dashboard from "./Components/Dashboard"
import Navigation from "./Components/Navbar"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="Login" element={<LoginPage />} />
        <Route path="Register" element={<RegisterPage />} />
        <Route path="Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
