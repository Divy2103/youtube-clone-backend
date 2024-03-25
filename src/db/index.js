import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {

    try {

        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        // console.log('connectionInstance :-', connectionInstance);
        // console.log('connectionInstance.connections :- ', connectionInstance.connection);
        console.log('MongoDB connected:', connectionInstance.connection.host);

    } catch (error) {
        console.log("mongoDB connection Error", error);
        process.exit(1);
        // throw error;
    }
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
}

export default connectDB;