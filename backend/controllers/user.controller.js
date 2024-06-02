import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);

    } catch (err) {
        console.log(err);
        res.status(500).json("Failed to get users!");
    }
}


export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id },
        })
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json("Failed to get user!");
    }
}


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userID;
    // console.log(tokenUserId);
    const { password, profile, ...body } = req.body;

    if (id !== tokenUserId) {
        return res.status(403).json("Not authorized!");
    }

    let updatedPass = null;

    try {
        if (password) {
            updatedPass = await bcrypt.hash(password, 15);
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...body,
                ...(updatedPass && { password: updatedPass }),
                ...(profile && {profile}),
            }
        })

        const {password:userPassword , ...rest} = updatedUser;
        res.status(200).json(rest);
    } catch (err) {
        console.log(err);
        res.status(500).json("Failed to update user!");
    }
}


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userID;

    if (id !== tokenUserId) {
        return res.status(403).json("Not authorized!");
    }
    try {
        const deleteuser = await prisma.user.delete({
            where: { id }
        })
        res.status(200).json("User deleted!");
    } catch (err) {
        console.log(err);
        res.status(500).json("Failed to delete user!");
    }
}