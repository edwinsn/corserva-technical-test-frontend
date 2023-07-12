import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <h3>
        <span className="badge bg-secondary">Not found</span>
      </h3>
      <button className="btn btn-primary" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}
