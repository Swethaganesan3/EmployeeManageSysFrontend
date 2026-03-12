import React,{useEffect,useState} from "react";
import API from "../api/api";
import "../styles/employee.css";

function EmployeePage(){

const [employees,setEmployees]=useState([]);
const [employeeId,setEmployeeId]=useState("");

const [form,setForm]=useState({
id:"",
name:"",
email:"",
department:""
});

useEffect(()=>{
viewAllEmployees();
},[]);


/* VIEW ALL EMPLOYEES */

const viewAllEmployees = async () => {

const res = await API.get("/Employee");
setEmployees(res.data);

};


/* VIEW EMPLOYEE BY ID */

const viewEmployeeById = async () => {

if(!employeeId){
alert("Enter Employee ID");
return;
}

const res = await API.get(`/Employee/${employeeId}`);
setEmployees([res.data]);

};


/* HANDLE INPUT CHANGE */

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


/* CREATE / UPDATE EMPLOYEE */

const submitEmployee = async (e) => {

e.preventDefault();

const employeeData = {
name: form.name,
email: form.email,
department: form.department
};

try{

if(form.id){

await API.put(`/Employee/${form.id}`,{
id:form.id,
...employeeData
});

}else{

await API.post("/Employee", employeeData);

}

viewAllEmployees();

setForm({
id:"",
name:"",
email:"",
department:""
});

}
catch(error){

console.log(error.response?.data);
alert("Error saving employee");

}

};


/* DELETE EMPLOYEE */

const deleteEmployee = async (id) => {

await API.delete(`/Employee/${id}`);
viewAllEmployees();

};


return(

<div className="employee-container">

<h2>Employee Management</h2>


{/* SEARCH EMPLOYEE BY ID */}

<div className="search-box">

<input
placeholder="Enter Employee ID"
value={employeeId}
onChange={(e)=>setEmployeeId(e.target.value)}
/>

<button onClick={viewEmployeeById}>
View Employee By ID
</button>

<button onClick={viewAllEmployees}>
View All Employees
</button>

</div>



{/* EMPLOYEE FORM */}

<form className="employee-form" onSubmit={submitEmployee}>

<input
name="name"
placeholder="Employee Name"
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
{form.id ? "Update Employee" : "Create Employee"}
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

<button
className="edit-btn"
onClick={()=>setForm(emp)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteEmployee(emp.id)}
>
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