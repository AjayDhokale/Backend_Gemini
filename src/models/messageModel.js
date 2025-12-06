import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    isGeminiResponse: {
        type: Boolean,
        required: true
    }

}, { timestamps: true });

const MessageModel = mongoose.model('gemini_message', messageSchema)
export default MessageModel;
