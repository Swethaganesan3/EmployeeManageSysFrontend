import React,{useEffect,useState} from "react";
import API from "../api/api";
import "../styles/task.css";

function TaskPage(){

const [tasks,setTasks]=useState([]);
const [employees,setEmployees]=useState([]);
const [status,setStatus]=useState("");
const [taskId,setTaskId] = useState("");

const [form,setForm]=useState({
id:"",
title:"",
description:"",
dueDate:"",
status:"Pending",
employeeID:""
});

useEffect(()=>{
loadEmployees();
viewAllTasks();
},[]);


/* VIEW ALL TASKS */

const viewAllTasks = async () => {
const res = await API.get("/Task");
setTasks(res.data);
};


/* VIEW TASK BY ID */

const viewTaskById = async () => {

if(!taskId){
alert("Enter Task ID");
return;
}

const res = await API.get(`/Task/${taskId}`);
setTasks([res.data]);

};


/* LOAD EMPLOYEES */

const loadEmployees=async()=>{
const res=await API.get("/Employee");
setEmployees(res.data);
};


/* FILTER TASKS */

const filterTasks=async()=>{

if(!status){
alert("Select Status");
return;
}

const res=await API.get(`/Task/status/${status}`);
setTasks(res.data);

};


/* HANDLE INPUT CHANGE */

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


const submitTask = async (e) => {

e.preventDefault();

const taskData = {
title: form.title,
description: form.description,
dueDate: form.dueDate,
status: form.status,
employeeID: parseInt(form.employeeID)
};

try{

if(form.id){

await API.put(`/Task/${form.id}`,{
id: form.id,
...taskData
});

}else{

await API.post("/Task", taskData);

}

viewAllTasks();

setForm({
id:"",
title:"",
description:"",
dueDate:"",
status:"Pending",
employeeID:""
});

}
catch(error){

console.log(error.response?.data);
alert("Error assigning task");

}

};


/* DELETE TASK */

const deleteTask=async(id)=>{
await API.delete(`/Task/${id}`);
viewAllTasks();
};


return(

<div className="task-container">

<h2>Task Management</h2>


{/* SEARCH TASK BY ID */}

<div className="search-box">

<input
placeholder="Enter Task ID"
value={taskId}
onChange={(e)=>setTaskId(e.target.value)}
/>

<button onClick={viewTaskById}>
View Task By ID
</button>

<button onClick={viewAllTasks}>
View All Tasks
</button>

</div>



{/* FILTER SECTION */}

<div className="filter-box">

<select onChange={(e)=>setStatus(e.target.value)}>

<option value="">Select Status</option>
<option value="Pending">Pending</option>
<option value="InProgress">InProgress</option>
<option value="Completed">Completed</option>

</select>

<button onClick={filterTasks}>
Filter Tasks
</button>

</div>



{/* TASK FORM */}

<form className="task-form" onSubmit={submitTask}>

<input
name="title"
placeholder="Task Title"
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


{/* EMPLOYEE DROPDOWN */}

<select
name="employeeID"
value={form.employeeID}
onChange={(e)=>setForm({...form,employeeID:e.target.value})}
>

<option value="">Select Employee</option>

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
{form.id ? "Update Task" : "Assign Task"}
</button>

</form>



{/* TASK TABLE */}

<table className="task-table">

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

<button
className="edit-btn"
onClick={()=>setForm(task)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteTask(task.id)}
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

export default TaskPage;