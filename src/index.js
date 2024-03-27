import { app } from "./app.js";

import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import connectDB from "./db/index.js";

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("Error", error);
            throw error;
        });

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("mongoDb connection failed!", error);
    });