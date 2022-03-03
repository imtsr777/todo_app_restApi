import jwt from 'jsonwebtoken'

const chekToken = (req,res,next) =>{
    try{

        const {token} = req.headers
        let userToken = jwt.verify(token,process.env.SECRET_KEY)
        
        if(userToken['user-agent']!=req.headers['user-agent']) throw new Error("This device not allowed")
        req.userInfo = userToken
    }
    
    catch(error){
        return res.status(400).json({message:error.message})
    }

    return next()
}

export default{
    chekToken
}