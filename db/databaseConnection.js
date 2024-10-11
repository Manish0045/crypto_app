const mongoose = require("mongoose");

const URL = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const myConnection = await mongoose.connect(URL, { serverSelectionTimeoutMS: 20000, socketTimeoutMS: 45000 });
        console.log("Database connected...");
        console.log("DATABASE:", myConnection.connection.name);
    } catch (error) {
        console.log("Error connecting to the database...!", error.message);
    }
};

module.exports = connectDB;
