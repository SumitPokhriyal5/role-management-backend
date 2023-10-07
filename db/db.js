const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = mongoose.connect(process.env.DATABASE_URL)

module.exports ={
    connectDB
};