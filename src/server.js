import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import userRoutes from './routes/userRoutes.js'

const PORT = process.env.PORT || 4009

const app = express()
app.use(express.json())

app.use("/auth",authRoutes.router)
app.use("/todos",todoRoutes.router)
app.use("/users",userRoutes.router)



app.listen(PORT,()=>{console.log("Server is running",PORT)})
