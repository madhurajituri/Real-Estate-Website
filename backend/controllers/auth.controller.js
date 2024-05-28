import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js'

export const register = async (req,res) => {
    const {username , email , password} = req.body;
    //HASH THE PASSWORD (library used - bcrypt)
    //save new user into database
    const hashedPass = await bcrypt.hash(password , 15); //any no. according to which hashing will be done (as this func is a promise we have to use async func)
    console.log(hashedPass);

    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password: hashedPass
        }
    })
    console.log(newUser);
}

export const login = (req,res) => {
    //db operations
}

export const logout = (req,res) => {
    //db operations
}