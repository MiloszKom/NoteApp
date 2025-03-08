import { Link } from "react-router-dom";
import React from "react";

export default function NotFoundPage() {
  return (
    <div className="not-found-container">
      <div className="error-code">404</div>
      <div className="title">Page Not Found</div>
      <Link to="/" className="home-button">
        Return Home
      </Link>
    </div>
  );
}
