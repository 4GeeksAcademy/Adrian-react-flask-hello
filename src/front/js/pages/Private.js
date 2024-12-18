import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";




export const Private = () => {
    const { store, actions } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState("pending");

    useEffect(() => {
        let authenticate = async () => {
            try {
                const result = await actions.private();
                setIsAuthenticated(result ? "yes" : "no");
            } catch (error) {
                console.error("error occured during authentication", error);
                setIsAuthenticated("no")
            }
        }
        authenticate();
    }, [actions]);


    switch (isAuthenticated) {
        case "pending":
            return (
                <div className="container text-center mt-5">
                    <i className="fa-solid fa-spinner fa-spin"></i>
                </div>
            )
        case "yes":
            return (
                <div className="container text-center mt-5">
                    <h1>Private Page <i className="fa-solid fa-champagne-glasses"></i></h1>
                    <p>This page is only accessible to successfully logged in users.</p>
                </div>
            )
        case "no":
            return (
                <div className="container text-center mt-5">
                    <h1>Access Denied <i className="fa-solid fa-ban"></i></h1>
                    <p>You're not an authenticated user. Please log in successfully to access the private page.</p>
                    <Link to="/login">
                        <p>Log In</p>
                    </Link>
                </div>
            )
    }
}