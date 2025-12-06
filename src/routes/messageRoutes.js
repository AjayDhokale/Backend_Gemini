import express from 'express'
import { createMessage, getAllMessages } from '../controllers/messageController.js'

const messageRouter = express.Router()


messageRouter.post('/create-message', createMessage)
messageRouter.get('/get-all-messages/:chatId', getAllMessages)


export default messageRouter