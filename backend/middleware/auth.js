import jwt from "jsonwebtoken"

const authMiddleware = async( req, res, next)=>{

    const{token} = req.headers;
    if (!token) {
        return res.json({
            success: false,
            message: "Not authorized, Login Again"
        })
    }
    try{
        const token_deode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = token_deode.id;
        next()
    }catch(error){
            console.log(error)
            res.json({
                success: false,
                message:"Error in token verification"
            })
    }

}

export default authMiddleware;