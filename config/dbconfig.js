const mongoose = require("mongoose");

// connect with the URL
mongoose.connect(process.env.MONGO_URL)

// object for connection
const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("MongoDB is connected")
})

connection.on("error", (error) => {
    console.log("Connection error MONGODB", error)
})

module.exports = mongoose;