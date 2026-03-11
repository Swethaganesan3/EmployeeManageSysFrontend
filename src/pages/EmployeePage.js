import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/employee.css";
import axios from "axios";

function EmployeePage() {

    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        id: "",
        name: "",
        email: "",
        department: ""
    });

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const res = await API.get("/Employee");
        setEmployees(res.data);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //snackbar
   //materail UI install 
   //view 
        if (form.id) {
            await API.put(`/Employee/${form.id}`, {
                id: form.id,
                name: form.name,
                email: form.email,
                department: form.department
            }).then().catch((e)=> {
                debugger
                console.log(e)});
        } else {

            await axios.post("/Employee", {
                name: form.name,
                email: form.email,
                department: form.department
            }).then().catch((e)=> {
                debugger
                console.log(e)});;
        }

        setForm({ id: "", name: "", email: "", department: "" });
        loadEmployees();
    };

    const editEmployee = (emp) => {
        setForm({
            id: emp.id,
            name: emp.name,
            email: emp.email,
            department: emp.department
        });
    };

    const deleteEmployee = async (id) => {
        await API.delete(`/Employee/${id}`);
        loadEmployees();
    };

    return (
        <div className="container">

            <h2>Employee Management</h2>

            <form onSubmit={handleSubmit} className="form">

                <input
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                />

                <button type="submit">
                    {form.id ? "Update" : "Add"} Employee
                </button>

            </form>

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map(emp => (
                        <tr key={emp.id}>

                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
        
                            <td>

                                <button onClick={() => editEmployee(emp)}>
                                    Edit
                                </button>

                                <button onClick={() => deleteEmployee(emp.id)}>
                                    Delete
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeePage;