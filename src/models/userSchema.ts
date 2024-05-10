import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type :String,required:true,unique:true},
    password: {type :String,required:true,unique:true},
    email : {type :String,required:true,unique:true},
    bio :{type:String},
    profileType : {type : String, enum:["public","private"],default:"public"},
    isAdmin : {type : Boolean},
    phoneNumber: {type :String,unique:true,minLength:10,maxLength:10},
    profilePhoto: {type :String},
    signInPlatform:{type:String,enum:["Google","Facebook","Twitter","Basic"],default:"Basic"}
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

