import prisma from "../lib/prisma.js";

export const getposts = async (req,res) => {
    const query = req.query;
    // console.log(query);
    try{
        const posts = await prisma.post.findMany({
            where:{
                city: query.city || undefined,
                type: query.type || undefined,
                property: query.property || undefined,
                bedroom: parseInt(query.bedroom) || undefined,
                price:{
                    gte: parseInt(query.minprice) || 0,
                    lte: parseInt(query.maxprice) || 1000000000,
                }
            }
        });
        res.status(200).json(posts);
    }catch(err){
        console.log(err);
        res.status(500).json("Failed to get posts!");
    }
}


export const getpost = async (req,res) => {
    const id = req.params.id;
    try{
        const post = await prisma.post.findUnique({
            where: {id},
            include:{
                postDetail:true,
                user:{
                    select:{
                        username:true,
                        profile:true
                    }
                }
            }
        });
        res.status(200).json(post);
    }catch(err){
        console.log(err);
        res.status(500).json("Failed to get post!");
    }
}


export const updatepost = async (req,res) => {
    try{

        res.status(200).json();
    }catch(err){
        console.log(err);
        res.status(500).json("Failed to update post!");
    }
}


export const createpost = async (req,res) => {
    const body = req.body;
    const tokenUserId = req.userID;

    try{
        const createpost = await prisma.post.create({
            data:{
                ...body.postData,
                userID : tokenUserId,
                postDetail:{
                    create:body.postDetail
                }
            }
        })
        res.status(200).json(createpost);
    }catch(err){
        console.log(err);
        res.status(500).json("Failed to create post!");
    }
}


export const deletepost = async (req,res) => {
    const id = req.params.id;
    const tokenUserId = req.userID
    try{
        const post = await prisma.post.findUnique({
            where:{id}
        })

        if(post.userID !== tokenUserId){
            return res.status(403).json("You are not authorized!");
        }

        await prisma.post.delete({
            where:{id , userID:tokenUserId}
        })

        res.status(200).json("Post deleted!");

    }catch(err){
        console.log(err);
        res.status(500).json("Failed to delete post!");
    }
}