// require("dotenv").config({ path: "./.env" });
// import dotenv from "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";

connectDB();

/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI} /${DB_NAME}`);
        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("Error", error);
    }
})();
*/