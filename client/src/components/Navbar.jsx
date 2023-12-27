import React, { useContext } from "react";
import Logo from "../img/logo.png"
import {Link} from 'react-router-dom'
import { AuthContext } from "../context/authContext.js";
const Navbar = () =>{

    const {currentUser,logout,login} = useContext(AuthContext);
    console.log(currentUser);
    return(
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/"><img src={Logo} alt="" /></Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=art"><h6>ART</h6></Link>
                    <Link className="link" to="/?cat=science"><h6>SCIENCE</h6></Link>
                    <Link className="link" to="/?cat=technology"><h6>TECHNOLOGY</h6></Link>
                    <Link className="link" to="/?cat=cinema"><h6>CINEMA</h6></Link>
                    <Link className="link" to="/?cat=sports"><h6>SPORTS</h6></Link>
                    <Link className="link" to="/?cat=food"><h6>FOOD</h6></Link>
                    <Link className="link" to="/?cat=travel"><h6>TRAVEL</h6></Link>
                    {currentUser?<Link className="link" to={`/?cat=${currentUser.id}`}><img src={currentUser ?`../upload/${currentUser.img}` : null} alt="" className="ui" /></Link>:null}
                    <span>{currentUser?.username}</span>
                    <span>{currentUser? <span onClick={logout}>Logout</span> : <Link className="link" to="login">Login</Link>}</span>
                    <span className="write">
                        {currentUser ?<Link to="/write" className="link">Write</Link>
                        : <Link to="login" className="link">Write</Link>}
                    </span>
                </div>
            </div>        
        </div>
    )
}

export default Navbar