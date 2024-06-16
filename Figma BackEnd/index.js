import express, { json } from "express";
import mongoose from "mongoose";
import AuthRouter from "./route/Auth.js";
import dotenv from "dotenv";
import BlogRouter from "./route/Blogs.js";
import cors from "cors";
import {fileURLToPath} from "url"
import { dirname, join } from "path";


dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json())
app.use("/auth", AuthRouter)
app.use("/blogs", BlogRouter)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use("/uploads", express.static(join(__dirname,"uploads")))


const connection = process.env.CONNECTION_STRING;


mongoose.connect(connection,
    {
        useNewUrlParser: true, 
        UseUnifiedTopology: true,
    })

    .then(() => {
        console.log("DataBase is Connected");
    })

    .catch((error) => {
        console.log("DataBase is not connected", error);
    });


app.listen(port, () => {
    console.log(`Hello express: ${port}`)
});