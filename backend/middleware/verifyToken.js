import jwt from 'jsonwebtoken';

export const verifyToken = (req,res,next) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json("Not Authenticated!");

    jwt.verify(token , process.env.JWT_SECRET_KEY , async(err , payload)=>{
        if(err) return res.status(403).json("Token is not valid!");

        req.userID = payload.id;

        next(); //to continue after authentication
    })

}
