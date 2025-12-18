import mongoose from "mongoose";
import "dotenv/config";

const dbConnect = async () => {

    const uri = process.env.MONGO_URI

    if (!uri) {
        console.error("URI string not found");
        process.exit(1)
    }

    try {
        const conn = await mongoose.connect(uri)
        if (conn) {
            console.log("Database Connected Succesfully");
        }

    } catch (error) {
        console.error("Error", error);
        process.exit(1)
    }

 



}

export default dbConnect