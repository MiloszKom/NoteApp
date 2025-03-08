import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthMutations } from "../hooks/useAuthMutations";

import Spinner from "../common/Spinner";

export default function LoginPage() {
  const [username, setUsername] = useState("a username");
  const [password, setPassword] = useState("milosz123");
  const [error, setError] = useState("");

  const location = useLocation();

  const message = location.state?.message;

  const { loginMutation } = useAuthMutations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");

    const data = {
      username,
      password,
    };

    loginMutation.mutate(data);
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Login</h2>
        {(error || message) && (
          <p className="form-error">{error ? error : message ? message : ""}</p>
        )}
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
          <button
            type="submit"
            className={`form-button ${
              loginMutation.isPending || loginMutation.isSuccess
                ? "disabled"
                : ""
            }`}
            disabled={loginMutation.isPending || loginMutation.isSuccess}
            onClick={handleSubmit}
          >
            {loginMutation.isPending || loginMutation.isSuccess ? (
              <Spinner />
            ) : (
              "Log in"
            )}
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
