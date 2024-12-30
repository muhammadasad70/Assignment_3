import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {dbName:"EventEase2"}).then(() => {
        console.log("Database connection successful");
    }).catch((error) => {
        console.log("Database connection failed", error);
    }); 

}