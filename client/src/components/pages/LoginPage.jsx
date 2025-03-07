import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    console.log("Logging in with:", { username, password });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Login</h2>
        {error && <p className="form-error">{error}</p>}
        <form className="form">
          <input
            type="text"
            placeholder="Username"
            className="form-input"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="form-button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <div className="form-text">
          Don't have an account?{" "}
          <Link to="/signup" className="form-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
