const express = require("express")
const app = express();
require('dotenv').config()
const dbConfig = require("./config/dbconfig.js")
// to destructure json
app.use(express.json());
const userRoute = require("./routes/userRoutes")
const adminRoute = require("./routes/adminRoutes")
const doctorRoute = require("./routes/doctorRoutes")



// whenever api req is coming with word api/user, go and search api endpoints in the userRoute
app.use("/api/user", userRoute);

app.use("/api/admin", adminRoute);

app.use("/api/doctor", doctorRoute);



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Node Server running on port   ${port}`)
})





