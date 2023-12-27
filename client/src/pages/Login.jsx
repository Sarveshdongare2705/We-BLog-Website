import React, { useContext, useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Login = () =>{

    const {login} = useContext(AuthContext);

    const navigate = useNavigate()

    const [loginStatus, setloginStatus] = useState(''); 
    const [inputs,setInputs] = useState({
        username:"",
        password:"",
    });

    const handleChange = e=>{
        setInputs(prev =>({...prev , [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e=>{
        e.preventDefault()
        try {
            await login(inputs)
            navigate("/");//navigate to home page
        } catch (err) {
            console.log(err);
            setloginStatus(err.response.data); // Update the state variable with error data
        }
    }
    return(
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Username" onChange={handleChange} name="username" />
                <input type="password" placeholder="Password" onChange={handleChange} name="password"/>
                <button onClick={handleSubmit}>Login</button>
                <p>{loginStatus}</p>
                <span>Don't have an account?<Link to='/register'>Register</Link></span>
            </form>
        </div>
    )
}

export default Login