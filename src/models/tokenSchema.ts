
import mongoose, { Schema, model } from "mongoose";

const tokenSchema = new Schema({
    username: {type :String,required:true,unique:true},
    token : {type:String,required:true},
    expiresAt:{type:Date}
}, { timestamps: true });

export const Token = mongoose.model("Token", tokenSchema);

//Single SO
//