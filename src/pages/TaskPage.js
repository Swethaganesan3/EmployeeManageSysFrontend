import React,{useEffect,useState} from "react";
import API from "../api/api";
import "../styles/task.css";

function TaskPage(){

const [tasks,setTasks]=useState([]);
const [employees,setEmployees]=useState([]);
const [status,setStatus]=useState("");

const [form,setForm]=useState({
id:"",
title:"",
description:"",
dueDate:"",
status:"Pending",
employeeID:""
});

useEffect(()=>{
loadTasks();
loadEmployees();
},[]);

const loadTasks=async()=>{
const res=await API.get("/Task/status/Pending").catch(()=>({data:[]}));
setTasks(res.data);
};

const loadEmployees=async()=>{
const res=await API.get("/Employee");
setEmployees(res.data);
};

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const submitTask=async(e)=>{
e.preventDefault();

if(form.id){

await API.put(`/Task/${form.id}`,form);

}else{

await API.post("/Task",form);

}

setForm({
id:"",
title:"",
description:"",
dueDate:"",
status:"Pending",
employeeID:""
});

loadTasks();
};

const deleteTask=async(id)=>{
await API.delete(`/Task/${id}`);
loadTasks();
};

const filterStatus=async()=>{
const res=await API.get(`/Task/status/${status}`);
setTasks(res.data);
};

return(

<div className="task-container">

<h2>Task Management</h2>

<form onSubmit={submitTask} className="task-form">

<input
name="title"
placeholder="Title"
value={form.title}
onChange={handleChange}
/>

<input
name="description"
placeholder="Description"
value={form.description}
onChange={handleChange}
/>

<input
type="date"
name="dueDate"
value={form.dueDate}
onChange={handleChange}
/>

<select
name="employeeID"
value={form.employeeID}
onChange={handleChange}
>

<option>Select Employee</option>

{employees.map(emp=>(
<option key={emp.id} value={emp.id}>
{emp.name}
</option>
))}

</select>

<select
name="status"
value={form.status}
onChange={handleChange}
>

<option>Pending</option>
<option>InProgress</option>
<option>Completed</option>

</select>

<button type="submit">
{form.id?"Update":"Create"} Task
</button>

</form>

<div className="filter">

<select onChange={(e)=>setStatus(e.target.value)}>
<option value="">Filter Status</option>
<option value="Pending">Pending</option>
<option value="InProgress">InProgress</option>
<option value="Completed">Completed</option>
</select>

<button onClick={filterStatus}>
Filter
</button>

</div>

<table>

<thead>

<tr>
<th>ID</th>
<th>Title</th>
<th>Status</th>
<th>Employee</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{tasks.map(task=>(
<tr key={task.id}>

<td>{task.id}</td>
<td>{task.title}</td>
<td>{task.status}</td>
<td>{task.employeeID}</td>

<td>

<button onClick={()=>setForm(task)}>
Edit
</button>

<button onClick={()=>deleteTask(task.id)}>
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

export default TaskPage;