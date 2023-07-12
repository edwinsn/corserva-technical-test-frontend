import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Sale Orders
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/new-sale-order" className="nav-link">
              New sale order
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
