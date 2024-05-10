import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "../models";
import { clientId, clientSecret, redirectURIGoogleSSO, tokenSecret } from "../providers/locals";
import * as  jwt from "jsonwebtoken";
import axios from "axios";


export const login = async(
    req:Request,
    res : Response,
) => {
    try{
        const {username,password} = req.body;
        const userDetails = await User.findOne({username:username})
        if(!userDetails){
            return res.status(400).json({message:"User not present,Please register first"});
        }
        const hashedPassword = userDetails.password;
        const isvalidPass = await bcrypt.compare(password,hashedPassword)
        if(isvalidPass){
            const payload = {
                username : userDetails.username,
                email : userDetails.email,
                isAdmin : userDetails.isAdmin,
                profileType : userDetails.profileType,
            }
            const accessToken = jwt.sign(payload,tokenSecret,{expiresIn:'1d'})
            return res.status(200).json({message:accessToken});
            
        }
        return res.status(400).json({message:"Invalid Credentials"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",err});
    }
}

export const register = async(
    req: Request,
    res: Response,
) => {
    try{
        const {username,password,email} = req.body;
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password,salt) as any;
        const newUser = new User();
        newUser.username = username;
        newUser.password = hashedPassword as string;
        newUser.email = email;
        await newUser.save();
        return res.status(200).json({message:"User Registered successfully"});
    }catch(err){
        return res.status(500).json({message:"Internal server error",err});
    }
}

export const logout = async(
    req:Request,
    res:Response,
) => {
    try{


    } catch(err){
        return res.status(500).json({message:"Internal server error occured"})
    }
}

export const loginViaSocialApps = async(
    req:Request,
    res:Response,
) => {
    try{
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectURIGoogleSSO}&response_type=code&scope=profile email`;
        res.redirect(url)
    } catch(err) {
        return res.status(500).json({message:"Internal server error occured"})
    }
}

export const HandleCallBackFromGoogle = async(
    req:Request,
    res:Response
) => {
    try{
        const {code} = req.query;
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: redirectURIGoogleSSO,
            grant_type: 'authorization_code',
          });
      
          const { access_token, id_token } = data;
      
          // Use access_token or id_token to fetch user profile
          const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          console.log(profile)
    } catch(err){
        return res.status(500).json({message:"Internal server error occured"})
    }
}