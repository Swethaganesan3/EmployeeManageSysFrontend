import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar(){

return(

<div className="navbar">

<div className="logo">
Company Manager
</div>

<div className="nav-links">

<Link to="/employees">Employees</Link>

<Link to="/tasks">Tasks</Link>

</div>

</div>

);
}

export default Navbar;