import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'

export const register = async (req,res) => {
    try{

        const {username , email , password} = req.body;

        //HASH THE PASSWORD (library used - bcrypt)
        //save new user into database
        const hashedPass = await bcrypt.hash(password , 15);
         //any no. according to which hashing will be done (as this func is a promise we have to use async func)
        // console.log(hashedPass);
        
        const newUser = await prisma.user.create({
            data:{
                username: username,
                email: email,
                password: hashedPass
            }
        })
        console.log(newUser);
        res.status(201).json({message : `User "${username}" created successfully!`});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Failed to create user!"});
    }
}

export const login = async (req,res) => {

    try{

        const {username , password} = req.body;

        //check if user exists or not
        const user = await prisma.user.findUnique({
            where : {username:username}
        })
        if(!user){
            res.status(401).json({message :"Invalid Credentials"});
        }
        
        //check if password is correct or not
        const passwordValid = await bcrypt.compare(password , user.password);
        if(!passwordValid){
            res.status(401).json({message :"Invalid Credentials"});
        }

        const age = 1000*60*24*7;

        const {password:userPassword , ...userInfo} = user //takes all info from user except password into userInfo
        //jwt token
        const token = jwt.sign({
            id:user.id,
            isAdmin:false
        },process.env.JWT_SECRET_KEY, {expiresIn:age} )
        //generate cookie token and send it to user
        // res.setHeader("Set-cookie" , "test="+"myValue").json("success");
        res.cookie("token",token,{
            httpOnly:true, //so that it cant be accessed by client
            //secure:true (cant be used right now because right now we are using localhost and not http)
            maxAge:age  //session expiry after login time
        }).status(200).json(userInfo);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "Invalid credentials"});
    }
}

export const logout = (req,res) => {
    res.clearCookie("token").status(200).json("Logged out!");
}