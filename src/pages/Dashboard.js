import React from "react";
import "../styles/dashboard.css";

function Dashboard() {

  return (
    <div className="dashboard">

      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        alt="logo"
        className="logo"
      />

      <h1>Employee Task Management System</h1>

      <p>
        This system helps manage employees and assign tasks efficiently.
        Administrators can create employees, assign tasks, track progress,
        and manage work status easily.
      </p>

      <div className="dashboard-cards">

        <a href="/employees" className="card">
          Manage Employees
        </a>

        <a href="/tasks" className="card">
          Manage Tasks
        </a>

      </div>

    </div>
  );
}

export default Dashboard;