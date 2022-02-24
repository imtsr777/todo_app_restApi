
const REGISTER = async (req,res)=>{
    const users = await req.fetch("select * from users")
    console.log(users)
}

export default {
    REGISTER
}