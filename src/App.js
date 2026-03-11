import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import EmployeePage from "./pages/EmployeePage";
import TaskPage from "./pages/TaskPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>

    </Router>
  );
}

export default App;