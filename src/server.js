import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import postgres from './utils/postgres.js'
const PORT = process.env.PORT || 4009

const app = express()
app.use(express.json())

app.use("/auth",authRoutes.router)



app.listen(PORT,()=>{console.log("Server is running",PORT)})
