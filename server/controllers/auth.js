import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from '../models/auth.js';

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

       const hashedPassword = await bcrypt.hash(password,12);
        
       const result = await Auth.create({userName,email,password:hashedPassword,time:new Date()});
       const token = jwt.sign({email:result.email,time:result.time},"bingoSecretKey",{expiresIn:'1h'});
       console.log(result);
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

          const confirmPassword = await bcrypt.compare(password,existingUser.password);
          if(!confirmPassword) return res.status(400).json({message:'Incorrect credentials'});
       
       const token = jwt.sign({email,time:existingUser.time},"bingoSecretKey",{expiresIn:'1h'});
       res.status(200).json({result:existingUser,token});   

   } catch (error) {
       console.log('Error while signing in');
       res.status(409).json({message:error});
   }
}