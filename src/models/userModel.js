import mongoose  from "mongoose";

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
},{timestamps : true})

const UserModel = mongoose.model('gemini_user', userSchema)
export default UserModel