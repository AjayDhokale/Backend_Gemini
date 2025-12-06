import express from 'express'
import { createChats, deleteChats, getChats } from '../controllers/chatController.js'
const chatRouter = express.Router()


chatRouter.get('/get-chats', getChats)
chatRouter.post('/create-chat', createChats)
chatRouter.delete('/delete-chat/:chatId', deleteChats)

export default chatRouter