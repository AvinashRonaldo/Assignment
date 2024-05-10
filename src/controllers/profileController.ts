import { Request, Response } from "express";
import { User } from "../models";
import { uploadImage } from "../helpers/uploadPhoto";

export const updateUserProfile = async(
    req:Request,
    res:Response
) => {
    try{
        const {newPhoneNumber,newUserName,newEmail,newProfilePic} = req.body;
        const {username,email} = req.user;
        const user = await User.findOne({usernname:username,email:email})
        if(!user){
            return res.status(400).json({message:"User not exists"})
        }
        const userNameExists = await User.findOne({username:newUserName})
        if(userNameExists){
            return res.status(400).json({message:"User name already exists,Try another one"})
        }
        const emailExists = await User.findOne({email:newEmail})
        if(emailExists){
            return res.status(400).json({message:"User Email already exists,Try another one"})
        }
        user.email = newEmail;
        user.username = newUserName;
        user.phoneNumber = newPhoneNumber;
        user.profilePhoto = newProfilePic || "";
        await user.save();
        return res.status(200).json({message:"User profile updated successfully"});
    } catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateProfileType = async(
    req : Request,
    res : Response,
) => {
    try {
        const {profileType} = req.body;
        const {username,email} = req.user;
        const user = await User.findOne({usernname:username,email:email})
        if(!user){
            return res.status(400).json({message:"User not exists"})
        }
        if(profileType == user.profileType) {
            return res.status(400).json({message:`You are already ${profileType}`})
        }
        user.profileType = profileType;
        await user.save();
        return res.status(200).json({message:"User profile Type updated successfully"});
    } catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const listAllProfiles = async(
    req:Request,
    res:Response,
) => {
    try{
        const {username,email} = req.user;
        const profiles = await User.find({});
        const modifiedProfiles = profiles.filter(profile => 
            profile.username!=username && profile.email!=email
        )
        return res.status(200).json({message:modifiedProfiles})
    } catch(err){
        return res.status(500).json({message:"Internal server error occured"})
    }
}

export const listAllPublicProfiles = async(
    req:Request,
    res:Response,
) => {
    try{
        const profiles = await User.find({profileType:"public"});
        return res.status(200).json({message:profiles})
    } catch(err){
        return res.status(500).json({message:"Internal server error occured"})
    }
}

export const getCurrentProfile = async(
    req:Request,
    res:Response
) => {
    try{
        const {username,email} = req.user;
        const userDetails = await User.findOne({username:username,email:email})
        if(!userDetails){
            return res.status(400).json({message:"User not exists"})
        }
        return res.status(200).json({message:userDetails})

    } catch(err){
        return res.status(500).json({message:"Internal server error occured"})
    }
}

export const uploadProfilePic = async(
    req:Request,
    res:Response
) => {
    try {
        const image = (req as any).file;
        const {username} = req.user;
  
        const imageUrl = await uploadImage(image,username);
  
        if (imageUrl) {
          return res
            .status(200)
            .json(
              {message:"Image uploaded successfully",  imageUrl })
        }
      } catch (error) {
        return res
          .status(500)
          .json({message:"Internal server error!",error});
      }
}