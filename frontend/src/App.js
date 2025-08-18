import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage"
import ForgotPasswordPage from "./pages/ForgotPassword/ForgotPasswordPage"
import CreateAccountPage from "./pages/CreateAccount/CreateAccountPage"
import HomePage from "./pages/Home/HomePage";
import TestPage from "./pages/TestPage/testPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/signup" element={<CreateAccountPage />} />
                <Route path="/testpage" element={<TestPage/>}/>
                <Route path="/home" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;