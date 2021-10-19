import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../models/auth.js';
import Profile from '../models/profile.js';
import { OAuth2Client } from 'google-auth-library';


export const getUsers = async(req,res) => {
   try {
       const users = await Auth.find();
       res.status(200).json(users);
   } catch (error) {
       res.status(404).json({message:"No user found"});
   }
}

export const signUp = async(req,res) => {
   const { userName,email,password } = req.body;
   try {
       const existingUser = await Auth.findOne({email});

       if(existingUser) 
          return res.status(404).json({message:'User already exists'});
       
       const changedPassword = password+"bingoSecretKey";   
       const hashedPassword = await bcrypt.hash(changedPassword,12);
        
       const result = await Auth.create({userName,email,password:hashedPassword,time:new Date()});
       const profile = await Profile.create({userName:userName,emailId:email,status:'Online',registeredDate:new Date(),
        opponents:[],opponentsData:[],matches:[]});
       const token = jwt.sign({email:result.email,time:result.time},"bingoSecretKey",{expiresIn:'1h'});
       res.status(201).json({result,token});

   } catch (error) {
       console.log('Error while signing up');
       res.status(409).json({message:error});
   }
}

export const signIn = async(req,res) => {
   const { email,password } = req.body;
   try {
       const existingUser = await Auth.findOne({email});
       if(!existingUser)
          return res.status(404).json({message:'User not exists'});

          const changedPassword = password+"bingoSecretKey";
          const confirmPassword = await bcrypt.compare(changedPassword,existingUser.password);
          if(!confirmPassword) return res.status(400).json({message:'Incorrect credentials'});
       
       const token = jwt.sign({email,time:existingUser.time},"bingoSecretKey",{expiresIn:'1h'});
       res.status(200).json({result:existingUser,token});   

   } catch (error) {
       console.log('Error while signing in');
       res.status(409).json({message:error});
   }
}

export const googleSignIn = async(req,res) => {
     const {email,userName,password} = req.body;
     try {
        const existingUser = await Auth.findOne({email});
        if(existingUser) {
          const changedPassword = password+"bingoSecretKey"; 
          const confirmPassword = await bcrypt.compare(changedPassword,existingUser.password);  
          if(!confirmPassword) return res.status(400).json({message:'Incorrect credentials'});

          const token = jwt.sign({email,time:existingUser.time},"bingoSecretKey",{expiresIn:'1h'});  
          res.status(201).json({result:existingUser,token});
        }   
        else{
           const changedPassword = password+"bingoSecretKey"; 
           const hashedPassword = await bcrypt.hash(changedPassword,12);
        
           const result = await Auth.create({userName,email,password:hashedPassword,time:new Date()});
           const profile = await Profile.create({userName:userName,emailId:email,status:'Online',registeredDate:new Date(),
        opponents:[],opponentsData:[],matches:[]});
           const token = jwt.sign({email:result.email,time:result.time},"bingoSecretKey",{expiresIn:'1h'});
           res.status(201).json({result,token});
        }
     } catch (error) {
         res.status(400).json({message:"Google Login went wrong"});
     }
}