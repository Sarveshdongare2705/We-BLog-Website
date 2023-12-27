import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Menu = ({cat})=>{
    const [posts,setPosts] = useState([]);
    const location = useLocation()
    const navigate = useNavigate()
    const postid = location.pathname.split("/")[2];

    useEffect(() =>{
        const fetchData  = async ()=>{
            try{
                console.log(cat);
                const res = await axios.get(`/posts/${cat}/${postid}`)

                setPosts(res.data)
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    },[cat])
    // const posts = [
    //     {
    //         id: 1,
    //         title: "Exploring the Grand Canyon",
    //         desc: "Embark on a mesmerizing journey through the stunning landscapes and breathtaking vistas of the Grand Canyon. Witness nature's artistry at its finest as you traverse the rugged terrains and gaze upon the majestic Colorado River carving its way through the magnificent canyon walls.",
    //         img: "https://images.pexels.com/photos/2882603/pexels-photo-2882603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    //     },
    //     {
    //         id: 2,
    //         title: "The Art of Cooking",
    //         desc: "Delve into the vibrant world of culinary arts, where flavors, aromas, and creativity blend together to create culinary masterpieces. Uncover the secrets behind delectable dishes, experiment with diverse ingredients, and experience the joy of creating meals that tantalize the taste buds.",
    //         img: "https://images.pexels.com/photos/6061584/pexels-photo-6061584.jpeg?auto=compress&cs=tinysrgb&w=800",
    //     },
    //     {
    //         id: 3,
    //         title: "Hiking in the Swiss Alps",
    //         desc: "Embark on an unforgettable hiking adventure amidst the breathtaking beauty of the Swiss Alps. Traverse lush green meadows, meander through enchanting forests, and conquer towering peaks while immersing yourself in the serene and awe-inspiring landscapes of Switzerland.",
    //         img: "https://images.pexels.com/photos/7199333/pexels-photo-7199333.jpeg?auto=compress&cs=tinysrgb&w=800",
    //     },
    //     {
    //         id: 4,
    //         title: "Learning a New Language",
    //         desc: "Embark on a linguistic journey to explore new cultures, broaden horizons, and connect with people from around the globe. Experience the beauty of communication as you dive into the intricacies of a new language, unlocking doors to a world rich in diversity and heritage.",
    //         img: "https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=800",
    //     },
    // ];
    return(
        <div className="menu">
            <h1>Other posts you may like.</h1>
            {posts.map((post=>(
                <Link to={`/post/${post.id}`} className="link">
                <div className="post" key={post.id}>
                    <img src={`../upload/${post.img}`} alt="" />
                    <h2>{post.title}</h2>
                </div>
                </Link>
            )))}
        </div>
    )
}
export default Menu