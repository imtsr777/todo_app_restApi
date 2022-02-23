import express from 'express'
import 'dotenv/config'
const PORT = process.env.PORT || 4000

const app = express()


app.listen(PORT,()=>{console.log("Server is running")})
