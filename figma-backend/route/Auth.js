import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
const AuthRouter = express.Router()
import Jwt from "jsonwebtoken";
import upload from "../middleWare/fileUpload.js";
import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ashishkumar17122002@gmail.com",
      pass: "rtde kbdr bhxu tyzb",
    },
  });

AuthRouter.post("/ResetPassword", async(req, res)=>{
    const {Email} = req.body
    try{
        const user = await User.findOne({Email})
        if(!user){
            return res.status(404).json({message: "Account Not Found, Create New Account"})
        }
        const mailOptions ={
            from: "ashishkumar17122002@gmail.com",
            to: Email,
            subject: "Reset Your Password",
            text: `CLICK THIS LINK TO RESET YOUR PASSWORD http://localhost:3000/ResetPassword/${Email}`
        }
        await transporter.sendMail(mailOptions)
        res.status(202).json({message: "Mail Send Succesfully"})

    }catch(err){
        console.log(err, "Error sending reset email")
    }
})


AuthRouter.post("/reset-password", async(req,res)=>{
    const {Email, NewPassword} = req.body;
    try{
        const user = await User.findOne({Email});
        if(!user){
            return res.status(404).json({message:"User not Found"});
        }
        const saltvalue  =10;
        const hashPassword = await bcrypt.hash(NewPassword, saltvalue);
        user.Password = hashPassword
        await user.save();
        res.status(200).json({message:"Password Reset Success"})
    }catch(err){
        console.log(err, "Error resetting Password")
    }
})


AuthRouter.post("/SignUp", async(req, res)=>{
    try{
        const{UserName, Email, Password, ConfirmPassword}= req.body
        if(!UserName || !Email || !Password || !ConfirmPassword ){
            return res.status(200).json({message:"All Fields Are Required"})
        }
        if(Password !== ConfirmPassword){
            return res.status(400).json({message:"Password Didn't Match"})
        }
        const existingUser = await User.findOne({$or: [{Email},{UserName}]})
        if(existingUser){
            return res.status(400).json({message: "User Already Exists"})
        }
        const saltvalue = 10
        const hashPassword=await bcrypt.hash(Password, saltvalue)
        const user = new User({
            UserName,
            Email,
            Password:hashPassword,
        });
        await user.save();
        res.status(201).json({message:"Signed Up Successfully"})
    }
    catch(err){
        console.log(err);
    }
});


AuthRouter.post("/Login", async(req, res)=>{
    try{
        const {Email, Password,UserName} = req.body;
        if(!Password || !(Email || Password)){
            return res.status(400).json({ message: "All Fields Are Required"})
        }
        const existingUser = await User.findOne({$or: [{Email}, {UserName}]})
        if(!existingUser){
            return res.status(401).json({message: "User Not Exists"})
        }
        const matchpassword = await bcrypt.compare(Password, existingUser.Password)
        if(!matchpassword){
            return res.status(402).json({message: "Invalid Password"})
        }
        const Token = Jwt.sign(
            { userid:  existingUser._id},
            process.env.JWT_SECRET_KEY
        )
            const userID = existingUser._id
        res.status(200).json({message: "Logged In Successfully", Token, userID});
    }
    catch(err){
        console.log(err);
    }
})


AuthRouter.get("/Profile/:id", async(req,res)=>{
    const userid = req.params.id;
    try{
        const user = await User.findById(userid);
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }
        res.status(200).json({message:"User Profile Fetched", user});
    }catch(err){
        console.log(err, "Error Getting Profile")
    }
})


AuthRouter.delete("/Profile/:id", async(req,res)=>{
    const userid = req.params.id;
    try{
        const user = await User.findByIdAndDelete(userid)
        res.json({message: "User Profile Deleted Successfully"})
    }catch(err){
        console.log(err,"Error Deleting User Profile")
    }
})


AuthRouter.patch("/Profile/:id", async(req,res)=>{
    try{
        const userid = req.params.id;
        const updates = req.body;
        const updatedProfile = await User.findByIdAndUpdate(userid, updates)
        res.json(updatedProfile)
    }catch(err){
        console.log(err, "Error Updating Profile")
    }
})


AuthRouter.patch("/ProfilePhoto/:id",upload.single("ProfilePhoto"), async(req,res)=>{
    const userId = req.params.id
    try{
        const ProfilePhoto = req.file.path;
        const user = await User.findById(userId,{new: true})
        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }
        user.ProfilePhoto = ProfilePhoto;
        await user.save()
        res.status(200).json({message:"User ProfilePhoto Updated", user})
    }catch(err){
        console.log(err, "Error Updating ProfilePic")
    }
})


export default AuthRouter;