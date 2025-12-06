import jwt from 'jsonwebtoken'
import 'dotenv/config'
const secretKey = process.env.JWT_SECRETE_KEY


const verifyUser = async (req, res, next) => {
    const header = req.headers.authorization

    if (!header) {
        return res.status(400).json({
            status: "error",
            message: "Unauthorised User"
        })
    }

    try {
        const token = header.split(' ')[1]
        const tokenData = await jwt.verify(token, secretKey)

        if (!tokenData) {
            return res.status(400).json({
                status: "error",
                message: "Unauthorised User"
            })
        }

        req.userId = tokenData.userId
        next()

    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: error.message
        })
    }
}


export default verifyUser
