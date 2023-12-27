import React, { useState , useEffect, useContext } from "react";
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import {Link , Navigate, useLocation, useNavigate} from 'react-router-dom';
import Menu from '../components/Menu.jsx';
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext.js";

const Single = () =>{


    const [post,setPost] = useState([]);

    const location = useLocation()
    const navigate = useNavigate()
    const postid = location.pathname.split("/")[2];

    const {currentUser} = useContext(AuthContext)
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleLike = async () => {
        try {
            await axios.post(`/posts/likepost/${post.id}`,{ userId: currentUser.id , postId: post.id});
            fetchLikeCount();
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };


    const fetchLikeCount = async () => {
        try {
            const res = await axios.get(`/posts/likecount/${post.id}`);
            console.log(res);
            setLikes(res.data.likeCount)// Assuming the count is returned from the backend
        } catch (error) {
            console.error("Error fetching like count:", error);
        }
    };
    
    useEffect(() =>{
        fetchLikeCount();
        const fetchData  = async ()=>{
            try{
                const res = await axios.get(`/posts/${postid}`)
                setPost(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[postid])

    const handleDelete = async ()=>{
        try{
            await axios.delete(`/posts/${postid}`);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }
    const getText = (html) =>{
        const doc = new DOMParser().parseFromString(html , "text/html")
        return doc.body.textContent
      }
    return(
        <div>
            <div className="single">
                <div className="content">
                    <img src={`../upload/${post.postImage}`} alt="Error Loading image" />
                    <div className="user">
                        {post.userImage ?<img src={`../upload/${post.userImage}`} alt="" /> : null}
                        <div className="info">
                            <span>{post.username}</span>
                            <p>Posted {moment(post.date).fromNow()}</p>
                        </div>
                        
                        {currentUser && currentUser.username == post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=${postid}`} state={post}>
                            <img src={Edit} alt="" />
                            </Link>
                            <img  onClick={handleDelete}src={Delete} alt="" />
                        </div>
                        )}
                {currentUser ?<div className="like-dislike-buttons">
                <button onClick={handleLike}>Like</button>
                <span>Likes: {likes}</span>
                </div> : null }
                    </div>
                    <h1>{post.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: post.desc }}></div> 
                </div>
                <Menu cat={post.cat}/>
            </div>
        </div>
    )
}

export default Single