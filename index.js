import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import dbConnect from './src/config/dbConnect.js'
import verifyUser from './src/middlewares/userAuthMiddleware.js'
import authRouter from './src/routes/authRotes.js'
import chatRouter from './src/routes/chatRoutes.js'
import messageRouter from './src/routes/messageRoutes.js'
import cors from "cors";

const app = express()

// Chagpt
app.use(cors({
    origin: "https://frontend-gemini.vercel.app",
    // origin: "http://localhost:5173",
    credentials: true
}));


app.use(express.json());
app.use(bodyParser.urlencoded())                // parse application/x-www-form-urlencoded
app.use(bodyParser.json())



dbConnect()                             // database connetivity


// parse application/json


app.use('/api/v1/auth', authRouter)
app.use(verifyUser)
app.use('/api/v1/chats', chatRouter)
app.use('/api/v1/messages', messageRouter)

// const port = process.env.PORT
// app.listen(port, () => console.log(`Example app listening on port ${port}`))
export default app;