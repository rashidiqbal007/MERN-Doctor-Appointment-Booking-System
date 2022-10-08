const express = require("express");
const router = express.Router();
const User = require("../models/userModel")
const Doctor = require("../models/doctorModel")
const authMiddleware = require("../Middlewares/authMiddlewares")



router.get("/get-all-doctors", authMiddleware, async (req, res) => {
    try {
        const doctors = await Doctor.find({});

        res.status(200).send({
            success: true,
            message: "Doctors Fetched Successfully",
            data: doctors,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching doctors ", success: false, error });

    }
});

router.get("/get-all-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find({});

        res.status(200).send({
            success: true,
            message: "Users Fetched Successfully",
            data: users,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching users ", success: false, error });

    }
});

router.post("/change-doctor-status", authMiddleware, async (req, res) => {
    try {
        // doctorid is uniquely generated in doctor model when a user applies for a doctor.
        // status is pending. This is what admin received now admin notifies user that he is approved or rejected.
        // receiving userid to notify user.
        const { doctorId, status, userId } = req.body;
        // note: previously we were only findbyID so it was not approving 
        const doctor = await Doctor.findByIdAndUpdate(doctorId, {
            status,
        });

        // find user (note userid if written it will fetch admin userid & send notifications to admin from middleware, so we write doctor.userid)and push notifications to unseen tab of user
        const user = await User.findOne({ _id: doctor.userId });
        // same code as applydoc api just change admin user to user(bcz now we are notifying user)
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request-changed",
            message: `Your doctor account has been ${status}`,
            onClickPath: "/notifications",
        })
        user.isDoctor = status === "approved" ? true : false;
        
        // await User.findByIdAndUpdate(user._id, { unseenNotifications });
        await user.save();
       
        res.status(200).send({
            message: "Doctor status updated successfully",
            success: true,
            data: doctor,
        });




    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error applying doctor account ", success: false, error });

    }
});
 


module.exports = router;