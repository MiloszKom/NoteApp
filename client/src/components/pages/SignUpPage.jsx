import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthMutations } from "../hooks/useAuthMutations";

import Spinner from "../common/Spinner";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

  const { signUpMutation } = useAuthMutations();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !passwordConfirm) {
      setError("Please fill in all the fields.");
      return;
    }

    setError("");

    const data = {
      username,
      password,
      passwordConfirm,
    };

    signUpMutation.mutate(data);
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
          <button
            type="submit"
            className={`form-button ${
              signUpMutation.isPending || signUpMutation.isSuccess
                ? "disabled"
                : ""
            }`}
            disabled={signUpMutation.isPending || signUpMutation.isSuccess}
            onClick={handleSubmit}
          >
            {signUpMutation.isPending || signUpMutation.isSuccess ? (
              <Spinner />
            ) : (
              "Sign up"
            )}
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
