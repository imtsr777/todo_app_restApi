import express from 'express'
import todoController from "../controllers/todoController.js"
import chekToken from '../middlewares/chekToken.js'


const router = express.Router()

router.post("/insert",chekToken.chekToken,todoController.INSERT_TODO)
router.put("/update",chekToken.chekToken,todoController.UPDATE_TODO)
router.get("/get",chekToken.chekToken,todoController.TODO_GET)

export default {
    router
}