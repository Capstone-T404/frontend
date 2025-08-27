import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage"
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage"
import CreateAccountPage from "./pages/CreateAccount/CreateAccountPage"
import HomePage from "./pages/Home/HomePage";
import Test from "./pages/test/testpage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/signup" element={<CreateAccountPage />} />
                <Route path="/test" element={<Test/>}/>
                
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;