import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <h2>Company Manager</h2>

      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
    </div>
  );
}

export default Navbar;