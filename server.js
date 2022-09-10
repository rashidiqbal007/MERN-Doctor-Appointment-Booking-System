const express = require("express")
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbconfig.js")
// to destructure json
app.use(express.json());
const userRoute = require("./routes/userRoutes")


// whenever api req is coming with word user, go and search api endpoints in the userRoute
app.use("/api/user" , userRoute);

const port = process.env.PORT || 5000;
app.listen(port,  () => {
    console.log(`Node Server running on port   ${port}`)})





