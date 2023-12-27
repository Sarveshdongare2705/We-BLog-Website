import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

const Register = () =>{

    const navigate = useNavigate()
    const [file,setFile] = useState(null);

    const [registerStatus, setRegisterStatus] = useState(''); 
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("file" , file)
            const res = await axios.post("/upload" , formData)
            return res.data
        }catch(err){
            console.log(err);
        }
    }


    const handleSubmit = async e=>{
        e.preventDefault()
        const imgUrl = await upload()
        try {
            const res = await axios.post("/auth/register",{
                username,
                email,
                password,
                img:file ? imgUrl :""
            });
            setRegisterStatus(res.data);
            setTimeout(()=>{
                navigate("/login");
            },1000);
        } catch (err) {
            console.log(err);
            setRegisterStatus(err.response.data); // Update the state variable with error data
        }
    }

    return(
        <div className="auth">
            <h1>Register</h1>
            <form>
                <input type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
                <input required type="text" placeholder="username" name="username" onChange={e=>setUsername(e.target.value)} />
                <input type="email" placeholder="email" name="email" onChange={e=>setEmail(e.target.value)}/>
                <input required type="password" placeholder="password" name="password"  onChange={e=>setPassword(e.target.value)}/>
                <button onClick={handleSubmit}>Register</button>
                <p>{registerStatus}</p>
                <span>Alreadt have an account?<Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Register