import React, { useState, useEffect, useContext } from "react";
import {  Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = e.target.emailInput.value;
		const password = e.target.passwordInput.value;
		

		const resp = await actions.login(email, password);
		if (resp) {
			console.log("signup succesful")
			alert("login succesful")
			navigate("/private")
		} else {
			console.log("your login failed")
			alert("we weren't able to login you in please try again")
		}
	}


	return (
		<div className="auth-div">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column w-100 align-items-center">
            <input type= "email" name="emailInput" placeholder="enter your email" required />
            <input type ="password" name="passwordInput" placeholder="enter your password" required/>
            
            <button className="btn btn-primary mt-3" type="submit">Login</button>
			<Link to="/signup" className="mt-4">Click here to signup</Link>
        </form>
    </div>
	);
};
