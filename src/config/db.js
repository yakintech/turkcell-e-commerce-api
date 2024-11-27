const mongoose = require('mongoose');




const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://user_turkcell:kVICxra2OoSXm9y5@cluster0.jcus0vv.mongodb.net/turkcell-e-commerce-db");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;