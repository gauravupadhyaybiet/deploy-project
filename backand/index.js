import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userroute.js"
import  companyRoute  from "./routes/companyroute.js";
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js";
import path from "path";


dotenv.config({path: '../.env'});

const PORT = process.env.PORT || 8080;

const app = express();
const _dirname = path.resolve();
app.use(express());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigin = 'http://localhost:5173';

// Use the cors middleware with specific origin
app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

 app.use("/api/v1/user",userRoute);
 app.use("/api/v1/company",companyRoute);
 app.use("/api/v1/job",jobRoute);
 app.use("/api/v1/application",applicationRoute);
 app.use(express.static(path.join(_dirname,"/frontend/vite-project/dist")));
 app.get('*',(_,res) =>{
    res.sendFile(path.resolve(_dirname,"frontend/vite-project","dist","index.html"));
 })


app.listen(PORT ,()=>{
    connectDB();
 
    console.log("server running at 8000");
});
