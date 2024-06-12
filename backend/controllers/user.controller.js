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
                ...(profile && { profile }),
            }
        })

        const { password: userPassword, ...rest } = updatedUser;
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


export const savePost = async (req, res) => {
    const postId = req.body.postID;
    const tokenUserId = req.userID;

    try {

        const savedPost = await prisma.savedPost.findUnique({
            where: {
                userID_postID:{

                    userID: tokenUserId,
                    postID: postId
                }
            }
        })

        if (savedPost) {
            await prisma.savedPost.delete({
                where: {
                    id: savedPost.id
                }
            })
            res.status(200).json("Post removed from saved list!")
        }
        else {
            await prisma.savedPost.create({
                data: {
                    userID: tokenUserId,
                    postID: postId
                }
            })
            res.status(200).json("Post saved!")
        }


    } catch (err) {
        res.status(500).json("Failed to save post!");
        console.log(err);
    }
}


export const profilePosts = async (req, res) => {
    const tokenUserId = req.params.userID;

    try {

        const allPosts = await prisma.post.findMany({
            where: {
                userID: tokenUserId
            }
        })
        const savedPosts = await prisma.savedPost.findMany({
            where: {
                userID: tokenUserId,
            },
            include: {
                post: true,
            },
        })
    const saved = savedPosts.map(item => item.post);

    res.status(200).json({ allPosts, saved });
}
    catch (err) {
    console.log(err);
    res.status(500).json("Failed to get user posts!");
}
}


export const getNotification = async (req, res) =>{
    const tokenUserId = req.userID;
    try{
        const unreadChats = await prisma.chat.count({
            where:{
                userIDs:{
                    hasSome: [tokenUserId]
                },
                NOT:{
                    seenBy:{
                        hasSome: [tokenUserId]
                    }
                }
            }
        })
        res.status(200).json(unreadChats);
    }
    catch(err){
        res.status(500).json("Failed to get notification number");
        console.log(err);
    }
}