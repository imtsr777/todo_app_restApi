import express from 'express'
const router = express.Router()
import userController from '../controllers/userController.js'
import chekToken from "../middlewares/chekToken.js"

router.get("/get",chekToken.chekToken,userController.GET_USERS)

export default {
    router
}