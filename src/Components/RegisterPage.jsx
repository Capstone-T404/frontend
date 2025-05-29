import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { Spinner } from "reactstrap";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const register = () => {
        // Client-side validation
        if (!email.trim() || !password.trim()) {
            setError("Please fill out all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Enter a valid email address.");
            return;
        }
        setLoading(true);
        setError("");
        try {

            toast.success("Registration successful!");
            navigate("/login");
        } catch (err) {
            console.error("Registration failed:", err);
            setError("Registration failed. Please check your credentials.");
            toast.error("Registration  failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main role="main">
            <div className="LoginPage">
                <img src="/images.jpg" alt="Reds Logo" className="LoginLogo" />
                <h1>Register</h1>
                <form onSubmit={(e) => { e.preventDefault(); register(); }}>
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? <Spinner size="sm" /> : "Login"}
                    </button>
                </form>

                {error && (
                    <p role="alert" style={{ color: "red", marginTop: "1rem" }}>
                        {error}
                    </p>
                )}
            </div>
        </main>
    );
}
