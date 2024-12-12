import React, {useContext} from "react";
import {Context} from "../store/appContext"
import { useNavigate } from "react-router-dom";


const Signup = ()=> {
    const {actions}= useContext(Context);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.emailInput.value;
        const password = e.target.passwordInput.value;
        const confirmPassword = e.target.confirmPasswordInput.value;
        if (password !== confirmPassword) {
            alert("password does not match")
            return;
        }

        const resp = await actions.signup(email, password);
        if (resp.ok) {
            console.log("signup succesful")
            alert("signup succesful you can now login")
            navigate("/login")
        } 
    }
    return(
    <div className="auth-div">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column w-100 align-items-center">
            <input type= "email" name="emailInput" placeholder="enter your email" required />
            <input type ="password" name="passwordInput" placeholder="enter your password" required/>
            <input type="password" name="confirmPasswordInput" placeholder="confirm your password" required/>
            <button className="btn btn-primary mt-3" type="submit">Signup</button>
        </form>
    </div>
    )
}


export default Signup;