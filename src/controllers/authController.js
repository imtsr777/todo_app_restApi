import jwt from 'jsonwebtoken'
import sha256 from 'sha256'
import rest from '../utils/postgres.js'

const REGISTER = async (req,res)=>{
    
    try{
        const { username,password,age } = req.body

        const[ chekUser ] = await rest.fetchAll(
            ` select userId from users where username=$1
            `,username
        )
        
        if( !username || !password || !age) {
            throw new Error("All are required")
        }

        if(typeof(username) !== 'string' || username.length>15 || username.length<5){
            throw new Error("Firstname must be string max length 14 min length 5")
        }

        if(!(/^[a-zA-Z0-9]{4,16}$/.test(password))){
            throw new Error("Password min len 4 max len 16")
        }
        
        if(age<3 || age>100){
            throw new Error("Enter normal age")
        }

        if(chekUser){
            throw new Error("This username already exists")
        }

        const[ newUser ] = await rest.fetchAll(
            ` insert into users (username,password,age)
                values($1,$2,$3) returning userId
            `,username,sha256(password),age
        )
    
    return res.json({
        status: 201,
        message: "The user successfully registered!",
        token: jwt.sign(
            newUser,
            process.env.SECRET_KEY
        )
    })
    
    }
    
    catch(error){
        return res.status(400).json({message:error.message})
    }
}

const LOGIN = async (req,res)=>{
    try{
        const { username,password} = req.body
    
        if( !username || !password) {
            throw new Error("All are required")
        }
        
        const [logged]  = await rest.fetchAll(
            ` select userId from users where username=$1 and password=$2
            `,username,sha256(password)
        )

        if(!logged) throw new Error("Username or Password incorrect")
        
        return res.json({
            status: 201,
            message: "The user successfully logged!",
            token: jwt.sign(
                logged,
                process.env.SECRET_KEY
            )
        })
    }

    catch(error){
        return res.status(400).json({message:error.message})
    }
}

export default {
    REGISTER,
    LOGIN
}