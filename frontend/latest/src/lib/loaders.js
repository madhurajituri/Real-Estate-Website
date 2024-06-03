import apirequest from "./apirequest.js"


export const singlePostLoader = async ({req,params}) => {
    const res = await apirequest.get("/post/"+params.id);
    return res.data;
}