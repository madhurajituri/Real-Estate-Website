import { defer } from "react-router-dom";
import apirequest from "./apirequest.js"


export const singlePostLoader = async ({request,params}) => {
    const res = await apirequest.get("/post/"+params.id);
    return res.data;
};

export const listPageLoader = async ({ request, params }) => {
    // console.log(request);
    const query = request.url.split("?")[1];
    const postPromise = apirequest.get("/post?"+query);
    return defer({
        postResponse : postPromise
    })
};

