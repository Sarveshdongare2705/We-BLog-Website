import  jwt from "jsonwebtoken";
import {db} from "../db.js";
import bcrypt from "bcryptjs";


export const register = (req,res)=>{
    //check existing user
    const q = "SELECT * from users where email = ? or username = ?";
    db.query(q,[req.body.email , req.body.username] , (err,data)=>{
        if(err){return res.json(err);}
        //data already exists
        if(data.length) {return res.status(409).json("User already exists")};

        //hash password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt);

        const q ="INSERT INTO users(`username`,`email`,`password`,`img`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hash,
            req.body.img
        ]
        db.query(q,[values], (err,data)=>{
            if(err){return res.json("Existing user already present");}
            return res.status(200).json("User has been created.")
        });
    });
};

export const login = (req,res)=>{
    //check if user exists
    const q = "SELECT * from users where username = ?";
    db.query(q,[req.body.username] , (err,data)=>{
        if(err){return res.json(err)}

        if(data.length == 0)//no user
        {
            return res.status(404).json("User not found!");
        }
        //check password  as user exists

        //compare bcrypt
        const isPasswordCorrect = bcrypt.compareSync(req.body.password , data[0].password)
        if(!isPasswordCorrect){
            return res.status(400).json("Incorrect Username and password");}

            //logged in 
            //now use jwt - json web token instead storing locally
            const token = jwt.sign({ id : data[0].id }, "jwtkey");//giving user id store in cookie random script key jwtkey
            const{password , ...other} = data[0];
            res.cookie("access_token" , token ,{
                httpOnly: true//extra security
            })
            .status(200)
            .json(other); //sending other data we need //access_token is cookie name

    });
    
};


export const logout = (req,res)=>{
    res.clearCookie("access_token" , {
        sameSite:"none",
        secure:true,
    }).status(200).json("User logged out")
    
}