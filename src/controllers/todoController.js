import rest from "../utils/postgres.js"


const INSERT_TODO = async(req,res)=>{
    try{
        const {userid} = req.userInfo
        const {todoText,todoDate} = req.body
        if(!todoText || todoText.length>100) throw new Error("Text very long")
        const[newTodo] = await rest.fetchAll(`insert into todos(userId,todoText,todoDate) values($1,$2,$3)`,userid,todoText,todoDate)
        
        res.status(200).json({message:"Todo succesfuly added"})
    }

    catch(error){
        res.status(400).json({message:error})
    }
}

const UPDATE_TODO = async(req,res)=>{

    try{
        const {todoid,todocompleted} = req.body    
        const [ updated_todo ] = await rest.fetchAll(`
            update todos set todocompleted=$2 where todoid=$1
        `,todoid,todocompleted)
        res.status(200).json({message:"Todo succesfuly updated"})
    }

    catch(error){
        res.status(400).json({message:error.message})
    }
}


const TODO_GET = async(req,res)=>{
    try{
        const{userid} = req.userInfo
        const my_todos = await rest.fetchAll(`
        select todoid,todotext,tododate,todocompleted from todos where userid=$1
        `,userid)

        res.status(200).json(my_todos)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

const DELETE_TODO = async(req,res)=>{
    try{
        const{todoid} = req.body
        const{userid} = req.userInfo
        const deleted = await rest.fetchAll(`delete from todos where todoid=$1 and userid=$2`,todoid,userid)
        res.status(200).json({message:"Delted user"})
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
}

export default {
    INSERT_TODO,
    UPDATE_TODO,
    TODO_GET,
    DELETE_TODO
}