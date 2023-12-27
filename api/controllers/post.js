import {db} from "../db.js"
import  jwt from "jsonwebtoken";
export const getPosts =(req,res)=>{
    const q = req.query.cat
    ? (!isNaN(req.query.cat)
        ? "SELECT u.username, p.title, p.desc, p.img, p.cat, p.date, u.img as userImage, p.uid , p.id FROM users u JOIN posts p ON u.id = p.uid WHERE p.uid = ? ORDER BY p.date DESC" // Numeric cat query
        : "SELECT u.username, p.title, p.desc, p.img, p.cat, p.date, u.img as userImage, p.uid,p.id FROM users u JOIN posts p ON u.id = p.uid WHERE p.cat = ? ORDER BY p.date DESC" // String cat query
      )
    : "SELECT u.username, p.title, p.desc, p.img, p.cat, p.date, u.img as userImage, p.uid,p.id FROM users u JOIN posts p ON u.id = p.uid ORDER BY p.date DESC";


    db.query(q,[req.query.cat] , (err,data) =>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data)
    })
}
export const getMenu =(req,res)=>{
    const q = "SELECT * FROM posts WHERE `cat` = ? AND `id` != ?";

    db.query(q,[req.params.cat , req.params.id] , (err,data) =>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data)
    })
}
export const getPost =(req,res)=>{
    const q ="SELECT p.id,`username`,`title`,`desc`,p.img as postImage, u.img as userImage ,`cat`,`date` from users u JOIN posts p ON u.id = p.uid WHERE p.id=? ;";
    db.query(q,[req.params.id] , (err,data) =>{
        
        if(err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    })
}
export const addPost = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json("NOT AUTHENTICATED!");

        jwt.verify(token, "jwtkey", async (err, userInfo) => {
            if (err) return res.status(403).json("TOKEN IS NOT VALID!");

            const q = "INSERT into posts(`title`,`desc`,`img`,`date`,`cat`,`uid`) VALUES (?)";
            const values = [
                req.body.title,
                req.body.desc,
                req.body.img,
                req.body.date,
                req.body.cat,
                userInfo.id,
            ];

            try {
                const result = await db.query(q, [values]);
                return res.json("post has been created");
            } catch (error) {
                console.error("Error inserting post:", error);
                return res.status(500).json(error);
            }
        });
    } catch (error) {
        console.error("Error in addPost:", error);
        return res.status(500).json(error);
    }
};

export const deletePost =(req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("NOT AUTHENTICATED !")

    jwt.verify(token , "jwtkey" ,(err,userInfo) =>{
        if(err) return res.status(403).json("TOKEN IS NOT VALID !")

        const q ="DELETE FROM posts where `id`=? AND `uid`=?";
        db.query(q,[req.params.id , userInfo.id] , (err,data) =>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("post deleted ");
        })
    })
}
export const updatePost =(req,res)=>{
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("NOT AUTHENTICATED !")

    jwt.verify(token , "jwtkey" ,(err,userInfo) =>{
        if(err) return res.status(403).json("TOKEN IS NOT VALID !")

        const q = "UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? where `id` = ? AND `uid` = ?"
        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(q , [...values , req.params.id , userInfo.id] , (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.json("post has been updated");
        })
    });
}


//like and dislike
export const changeLike = (req, res) => {
    const userId = req.body.userId;
    const postId = req.body.postId;

    const q = "SELECT * FROM likes WHERE userId = ? AND postId = ?";
    db.query(q, [userId, postId], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) {
            return res.json("Post already liked by this user");
        }

        const insertQuery = "INSERT INTO likes(postId, userId) VALUES (?, ?)";
        db.query(insertQuery, [postId, userId], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been liked");
        });
    });
}
export const likeValue = (req, res) => {
    const postId = req.params.id;
    const q = "SELECT COUNT(like_id) AS likeCount FROM likes WHERE `postId` = ?";
    
    db.query(q, [postId], (err, data) => {
        if (err) {
            console.error("Error fetching like count:", err);
            return res.status(500).json(err);
        }
        
        if (data.length === 0) {
            return res.status(404).json({ message: "No likes found for this post." });
        }

        const likeCount = data[0].likeCount;
        return res.status(200).json({ likeCount });
    });
};
