import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import chekToken from "../middlewares/chekToken.js"

router.get("/get",chekToken.chekToken,userController.GET_USERS)
router.put("/update",chekToken.chekToken,userController.UPDATE_USER)
router.delete("/delete",chekToken.chekToken,userController.DELETE_USER)

export default {
    router
}