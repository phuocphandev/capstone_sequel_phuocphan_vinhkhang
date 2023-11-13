import jwt from "jsonwebtoken"

export const createToken = (data)=>{
    let token = jwt.sign({data},"FREE", {expiresIn : "1y"})
    return token
}
export const checkToken = (token) => {
    return jwt.verify(token, "FREE")
}
export const decodeToken = (token)=>{
    return jwt.decode(token)
}

export const lockApi = (req,res,next) => {
    try {
        let {token} =  req.headers
        checkToken(token)
        next()
    } catch (err) {
        res.status(401).send("Forbidden!")
    }
}