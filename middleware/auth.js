require("dotenv").config()
const jwt = require("jsonwebtoken")
const auth= (req,res, next) => {

    const token= req.header('auth-token')
    if (!token){
        return res.status(401).json({msg:"Unauthorized"})
    }

    try{
    const decode = jwt.verify(token,process.env.JWT_SECRET)

    req.user=decode.user
next()    
}
    catch{
res.send(401).json({msg:"invalid token"})
    }

}

module.exports= auth