import React, { useEffect, useState } from "react";
import API from "../api/api";
import "../styles/employee.css";

function EmployeePage() {

const [employees,setEmployees]=useState([]);
const [searchId,setSearchId]=useState("");

const [form,setForm]=useState({
id:"",
name:"",
email:"",
department:""
});

useEffect(()=>{
viewAllEmployees();
},[]);


// VIEW ALL EMPLOYEES
const viewAllEmployees = async () => {
const res = await API.get("/Employee");
setEmployees(res.data);
};


// VIEW EMPLOYEE BY ID
const viewEmployeeById = async () => {

if(!searchId){
alert("Enter Employee ID");
return;
}

const res = await API.get(`/Employee/${searchId}`);
setEmployees([res.data]);

};


// HANDLE INPUT CHANGE
const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


// CREATE OR UPDATE EMPLOYEE
const submitEmployee=async(e)=>{
e.preventDefault();

if(form.id){

await API.put(`/Employee/${form.id}`,{
id:form.id,
name:form.name,
email:form.email,
department:form.department
});

}else{

await API.post("/Employee",{
name:form.name,
email:form.email,
department:form.department
});

}

setForm({id:"",name:"",email:"",department:""});
viewAllEmployees();
};


// EDIT EMPLOYEE
const editEmployee=(emp)=>{
setForm({
id:emp.id,
name:emp.name,
email:emp.email,
department:emp.department
});
};


// DELETE EMPLOYEE
const deleteEmployee=async(id)=>{
await API.delete(`/Employee/${id}`);
viewAllEmployees();
};


return(

<div className="employee-container">

<h2>Employee Management</h2>


{/* SEARCH SECTION */}

<div className="search-box">

<input
placeholder="Enter Employee ID"
value={searchId}
onChange={(e)=>setSearchId(e.target.value)}
/>

<button onClick={viewEmployeeById}>
View Employee By ID
</button>

<button onClick={viewAllEmployees}>
View All Employees
</button>

</div>



{/* FORM */}

<form className="employee-form" onSubmit={submitEmployee}>

<input
name="name"
placeholder="Employee Name"
value={form.name}
onChange={handleChange}
/>

<input
name="email"
placeholder="Employee Email"
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
{form.id ? "Update Employee" : "Add Employee"}
</button>

</form>



{/* EMPLOYEE TABLE */}

<table className="employee-table">

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

{employees.map(emp=>(
<tr key={emp.id}>

<td>{emp.id}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.department}</td>

<td>

<button className="edit-btn"
onClick={()=>editEmployee(emp)}>
Edit
</button>

<button className="delete-btn"
onClick={()=>deleteEmployee(emp.id)}>
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