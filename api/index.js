import  express from "express";
import postRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import multer from "multer"; //to upload image on server



const app = express()
app.use(express.json())
app.use(cookieParser())

//const upload = multer({ dest: './uploads/' })//no extension with file

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, '../client/public/upload/')
    },
    filename: function (req,file,cb) {
        cb(null, Date.now()+file.originalname) //store image with same name
    }
})
const upload = multer({ storage })

app.post('/api/upload' , upload.single('file') , function (req , res) {
    const file = req.file
    return res.status(200).json(file.filename)
})

app.use("/api/auth" , authRoutes)
app.use("/api/users" , userRoutes)
app.use("/api/posts" , postRoutes)

app.get("/test", (req,res)=>{
    res.json("it works!")
})

//all routes seperated in routes folder

app.listen(8800 , ()=>{
    console.log("Connected");
})