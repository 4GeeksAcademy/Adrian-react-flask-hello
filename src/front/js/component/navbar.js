import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate= useNavigate();

	const handleLogout = ()=> {
		sessionStorage.removeItem("token"); 
		console.log("token removed from session storage")
		navigate("/")
	}

	const isLoggedIn= !!sessionStorage.getItem("token")
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
					{isLoggedIn ? (
					<button className="btn btn-primary" onClick={handleLogout}>Logout</button>
					): (
					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>

					)}
					
				</div>
			</div>
		</nav>
	);
};
