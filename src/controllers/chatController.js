import ChatModel from "../models/chatModel.js";
import MessageModel from "../models/messageModel.js";

export const getChats = async (req, res) => {

    const userId = req.userId
    try {
        const chats = await ChatModel.find({ userId })

        res.status(200).json({
            data: chats,
            message: 'Ok',
            status: 'success'
        })
    } catch (err) {
        console.log(err.message);
        res.json({
            status: 'error',
            message: err.message
        })
    }

}


export const createChats = async (req, res) => {

    const chat = {
        name: req.body.name,
        userId: req.userId,
    }

    try {
        const newChat = await ChatModel.create(chat)
        if (!newChat) {
            res.status(400).json({
                status: 'error',
                message: 'Chat cannot be created '
            })
        }

        res.status(200).json({
            data: newChat,
            message: 'New Chat Created',
            status: 'success'
        })

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }

}

export const renameChat = async (req, res) => {

    const { id, name } = req.body;  

    if (!id || !name) {
        return res.status(400).json({ status: 'error', message: 'id and name are required' });
    }

    try {
        const updateChat = await ChatModel.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        )

        if (!updateChat) {
            res.status(400).json({
                status: 'error',
                message: 'Chat cannot found '
            })
        }

        res.status(200).json({
            data: updateChat,
            message: 'Chat Updated',
            status: 'success'
        })

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }

}


export const deleteChats = async (req, res) => {

    const { chatId } = req.params

    try {
        const isChatDeleted = await ChatModel.deleteOne({ _id: chatId })

        if (!isChatDeleted) {
            res.status(400).json({
                status: 'error',
                message: 'Chat cannot be deleted '
            })
        }

        const isMessagesDeleted = await MessageModel.deleteMany({ chatId })


        if (!isMessagesDeleted) {
            res.status(400).json({
                status: 'error',
                message: 'Unable to delete messages from the chat! '
            })
        }

        res.status(200).json({
            status: 'success',
            message: 'Chat deleted Succesfully ',
            data: {chatId}
        })

    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        })
    }
}
