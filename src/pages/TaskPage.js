import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/task.css";

function TaskPage() {

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState("");
  const [taskId, setTaskId] = useState("");

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    employeeID: ""
  });

  useEffect(() => {
    loadEmployees();
    viewAllTasks();
  }, []);

  /* LOAD ALL TASKS */
  const viewAllTasks = async () => {
    try {
      const res = await API.get("/Task");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
      alert("Error loading tasks");
    }
  };

  /* VIEW TASK BY ID */
  const viewTaskById = async () => {
    if (!taskId || isNaN(taskId)) {
      alert("Enter valid Task ID");
      return;
    }
    try {
      const res = await API.get(`/Task/${taskId}`);
      setTasks([res.data]);
    } catch {
      alert("Task not found");
    }
  };

  /* LOAD EMPLOYEES */
  const loadEmployees = async () => {
    try {
      const res = await API.get("/Employee");
      setEmployees(res.data);
    } catch {
      alert("Error loading employees");
    }
  };

  /* FILTER TASKS */
  const filterTasks = async () => {
    if (!status) {
      alert("Select Status");
      return;
    }
    try {
      const res = await API.get(`/Task/status/${status}`);
      setTasks(res.data);
    } catch {
      alert("Error filtering tasks");
    }
  };

  /* HANDLE FORM INPUT */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* EDIT TASK */
  const editTask = (task) => {
    setForm({
      id: task.id,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
      status: task.status,
      employeeID: task.employeeID
    });
  };

  /* ADD OR UPDATE TASK */
  const submitTask = async (e) => {
    e.preventDefault();

    const taskData = {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate,
      status: form.status,
      employeeID: Number(form.employeeID)
    };

    try {
      if (form.id) {
        await API.put(`/Task/${form.id}`, { id: form.id, ...taskData });
        alert("Task Updated Successfully");
      } else {
        await API.post("/Task", taskData);
        alert("Task Assigned Successfully");
      }

      viewAllTasks();

      setForm({
        id: "",
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
        employeeID: ""
      });
    } catch (error) {
      console.log(error);
      alert("Error assigning task");
    }
  };

  /* DELETE TASK */
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure to delete this task?")) return;
    try {
      await API.delete(`/Task/${id}`);
      alert("Task Deleted");
      viewAllTasks();
    } catch {
      alert("Error deleting task");
    }
  };

  /* VIEW EMPLOYEE TASKS */
  const viewEmployeeTasks = async (employeeId) => {
    try {
      const res = await API.get(`/Task/employee/${employeeId}`);
      setTasks(res.data);
    } catch {
      alert("No tasks found for this employee");
    }
  };

  return (
    <div className="task-container">

      <h2>Task Management</h2>

      {/* SEARCH TASK */}
      <div className="search-box">
        <input
          placeholder="Enter Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button onClick={viewTaskById}>View Task</button>
        <button onClick={viewAllTasks}>View All</button>
      </div>

      {/* FILTER */}
      <div className="filter-box">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={filterTasks}>Filter</button>
      </div>

      {/* TASK FORM */}
      <form className="task-form" onSubmit={submitTask}>
        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />

        {/* EMPLOYEE DROPDOWN */}
        <select
          name="employeeID"
          value={form.employeeID}
          onChange={(e) => setForm({ ...form, employeeID: e.target.value })}
          required
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>

        {/* STATUS */}
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>InProgress</option>
          <option>Completed</option>
        </select>

        <button type="submit">{form.id ? "Update Task" : "Assign Task"}</button>
      </form>

      {/* TASK TABLE */}
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Employee Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="6">No Tasks Found</td>
            </tr>
          ) : (
            tasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.dueDate ? task.dueDate.split("T")[0] : ""}</td>
                <td>{task.status}</td>
                <td>{employees.find(emp => emp.id === task.employeeID)?.name || "-"}</td>
                <td>
                  <button className="edit-btn" onClick={() => editTask(task)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                  <button className="task-btn" onClick={() => viewEmployeeTasks(task.employeeID)}>View Employee Tasks</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TaskPage;