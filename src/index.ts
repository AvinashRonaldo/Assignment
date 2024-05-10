import express from "express";
import cors from "cors";
import { router } from "./routes";
import mongoose from "mongoose";
import { port,mongoDBURI } from "./providers/locals";

const app : express.Application = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);


mongoose.connect(mongoDBURI).then(()=> {
    app.listen(port,() => {
        console.log("Server listening on port assigned");
    })
}).catch(err => 
    console.log("Error connecting to DB",err)
)