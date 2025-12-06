import 'dotenv/config'
import bcrypt from 'bcrypt'
import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRETE_KEY

export const registerUser = async (req, res) => {

    const { name, email, dob, password, city } = req.body
    const newUser = { name, email, password, dob, city }

    // this makes password encrpted 
    const encryptedPassword = await bcrypt.hash(password, 10)
    newUser.password = encryptedPassword


    //  This stores the data in Database
    try {
        const createdUser = await UserModel.create(newUser)

        if (!createdUser) {
            return res.status(400).json({
                status: 'error',
                message: 'Unable to register user, Please try again later.'
            })
        }


        res.status(201).json({
            status: 'success',
            message: "User Created succesfully",
            data: createdUser
        })

    } catch (error) {
        console.error(error.message);
        res.end()
    }

}


export const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const userExist = await UserModel.findOne({ email })

        if (!userExist) {
            res.status(401).json({
                status: 'error',
                message: "Invalid Email"
            })
        }


        const isPasswordMatch =await bcrypt.compare(password, userExist.password)

        if (!isPasswordMatch) {
            res.status(401).json({
                status: 'error',

                message: "Inavalid Password"
            })
        }

        const token = jwt.sign({
            userId: userExist._id,
            userEmail: userExist.email
        },
            secretKey,
            { expiresIn: '1h' }
        );



        res.status(200).json({
            status: 'success',
            message: 'Logged in successfully',
            token,
            data: userExist
        })

    } catch (error) {
        res.status(500).json({ error: "Login Failed" })
    }
}
