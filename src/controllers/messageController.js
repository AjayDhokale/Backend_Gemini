import MessageModel from "../models/messageModel.js"

export const createMessage = async (req, res) => {

    const { text, chatId, isGeminiResponse } = req.body
    try {
        const message = await MessageModel.create({ 
            text,
            chatId, 
            isGeminiResponse 
        })

        if (!message) {
            res.status(400).json({
                status: 'error',
                message: 'Unable to create new message '
            })
        }

        res.status(201).json({
            status: 'Success',
            message: 'Message Created',
            data: message
        })

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        })
    }
}



export const getAllMessages = async (req, res) => {
    const { chatId } = req.params
    const messages = await MessageModel.find({ chatId })

    if (!messages) {
        res.status(400).json({
            status: 'error',
            message: "Unable to  fetch new message"
        })
    }

    res.status(200).json({
        status: "success",
        message: 'All Messages',
        data: messages
    })


}
