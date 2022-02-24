import express from 'express'
import authController from "../controllers/authController.js"

const router = express.Router()

router.get("/register",authController.REGISTER)

export default {
    router
}