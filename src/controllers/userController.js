import rest from "../utils/postgres.js"

const GET_USERS = async(req,res)=>{
    try{
        const { role } = req.userInfo
        if(role!="admin") throw new Error("Only admin can view users")
    
        const users = await rest.fetchAll(`select * from users`)
        res.status(200).json(users)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const UPDATE_USER = async(req,res)=>{
    try{
        const { role } = req.userInfo
        const { role_user,userid } = req.body
        if(role!="admin") throw new Error("Only admin can edit users")
        
        const updatedUser = await rest.fetchAll(`update users set role=$1 where userid=$2`,role_user,userid)

        res.status(200).json({message:"Updated"})
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const DELETE_USER = async(req,res)=>{
    try{
        const { role } = req.userInfo
        const { userid } = req.body
        if(role!="admin") throw new Error("Only admin can edit users")
        
        const deletedUser = await rest.fetchAll(`delete from users where userid=$1`,userid)

        res.status(200).json({message:"Updated"})
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

export default{
    GET_USERS,
    UPDATE_USER,
    DELETE_USER
}