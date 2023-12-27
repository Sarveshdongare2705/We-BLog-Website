import React, { useContext, useEffect, useState } from "react";
import {Link, useLocation} from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import axios from "axios";

const Home = () =>{
    const truncateDescription = (desc) => {
        const maxLength = 350; // Define the maximum length for the description
      
        // Truncate the description to the defined maximum length
        const truncatedDesc = desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
      
        return truncatedDesc;
      };
      
      
      const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html , "text/html")
        return doc.body.textContent
      }


    const [posts,setPosts] = useState([]);

    const cat = useLocation().search
    useEffect(() =>{
        const fetchData  = async ()=>{
            try{
                console.log(cat);
                const res = await axios.get(`/posts/${cat}`)
                setPosts(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[cat])
    
    return(
        <div className="home">
            <div className="posts">
                {posts.map((post)=>(
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt='THERE IS AN ERROR LOADING THE IMAGE' />
                        </div>
                        <Link to={`/post/${post.id}`} className="link">
                        <div className="content">
                            <h1>{post.title}</h1>
                            <p>{getText(truncateDescription(post.desc))}</p>
                            <div className="flexed">
                            <img src={`../upload/${post.userImage}`}></img>
                            <div><button>Read More</button></div>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home