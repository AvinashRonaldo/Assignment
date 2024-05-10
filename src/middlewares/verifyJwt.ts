import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { tokenSecret } from "../providers/locals";


export const verifyToken = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        const jwtToken:string = req.headers['authorization'].split(" ")[1]
        if (jwtToken == "" || jwtToken == null){
            return res.status(401).json({message:"Un Authorised"})
        }
        const TOKEN_SECRET = tokenSecret;
        jwt.verify(jwtToken,TOKEN_SECRET as string,(err:any,user:any) => {
            if(err){
                console.log(err);
                return res.status(403).json({message:"Unable to verify claims",err})
            }
            req.user = user as any;
            next();
        })
    } catch(err) {
        return res.status(500).json({message:"Internal server error"})
    }
}

export const adminAuthenticate = async(
    req:Request,
    res : Response,
    next : NextFunction
) => {
    try{
        if(req.user.isAdmin == true) {
            next();
        }
        return res.status(401).json({message:"You do not have permissions to do this activity"})
    }catch(err){
        return res.status(500).json({message:"Internal server error occured"})
    }
}