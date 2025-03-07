import React, { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !passwordConfirm) {
      setError("Please fill in all the fields.");
      return;
    }

    setError("");
    console.log("Signing up with in with:", {
      username,
      password,
      passwordConfirm,
    });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Sign Up</h2>
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="form-input"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <button type="submit" className="form-button" onClick={handleSubmit}>
            Sign Up
          </button>
        </form>
        <div className="form-text">
          Already have an account?{" "}
          <Link to="/login" className="form-link">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
