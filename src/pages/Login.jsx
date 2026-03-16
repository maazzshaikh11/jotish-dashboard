import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const success = login(username, password);

    if (success) {
      navigate("/list");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="glass-card animate-fade-in">
        <h1 className="title-gradient">Welcome</h1>
        <p className="subtitle">Sign in to your dashboard</p>

        <div className="input-group">
          <label>Username</label>
          <input
            className="glass-input"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            className="glass-input"
            placeholder="••••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-primary" onClick={handleLogin}>
          Sign In
        </button>

        <p style={{ color: "var(--text-muted)", fontSize: "0.75rem", textAlign: "center", marginTop: "24px" }}>
          Default Credentials: testuser / Test123
        </p>
      </div>
    </div>
  );
}

export default Login;