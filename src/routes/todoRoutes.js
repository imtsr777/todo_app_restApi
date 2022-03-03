import express from 'express'
import todoController from "../controllers/todoController.js"
import chekToken from '../middlewares/chekToken.js'


const router = express.Router()

router.post("/insert",chekToken.chekToken,todoController.INSERT_TODO)
router.put("/update",chekToken.chekToken,todoController.UPDATE_TODO)
router.get("/get",chekToken.chekToken,todoController.TODO_GET)
router.delete("/delete",chekToken.chekToken,todoController.DELETE_TODO)

export default {
    router
}