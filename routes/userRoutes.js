
const express = require("express");
const router = express.Router();
require('dotenv').config()
const User = require("../models/userModel")
const Doctor = require("../models/doctorModel")
const Appointment = require("../models/appointmentModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddlewares")
const moment = require("moment")


// api         callback        
// for all mongodb operations we will use await keyword for functions to call
// now connect these endpoints to the server.js
router.post("/register", async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {

            res.status(200).send({ message: "User Already Exists", success: false });

        }

        const password = req.body.password;

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;
        // reqbody has name,email,password
        const newUser = new User(req.body);
        // method to save new user to mongodb
        await newUser.save();
        res.status(200).send({ message: "User Created Successfully", success: true })



    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error creating User", success: true })

    }
})

router.post("/login", async (req, res) => {
    try {
        // first check if email provided matches the email in db or not then we will compare password
        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send({ message: "User does not exist", success: false });


        // bcrypt library compares normal pass with the encrypted password
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        // if ismatch means pass & email is present in db now we will have to generate  token & store in frontend
        if (!isMatch) {
            res.status(200).send({ message: "Incorrect Password!", success: false });
        }
        else {
            // encrypting user id only
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            })
            res.status(200).send({ message: "Logging you in!", success: true, data: token });

        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });

    }
});
// protected route 
router.post("/get-user-info-by-id", authMiddleware, async (req, res) => {
    try {
        // find kro jis user ne protected route req kia ha does he exist?
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: "User does not Exist",
                success: false
            });
        }
        else {
            res.status(200).send({
                message: "User found & sending his details to frontend(PR&userredux) ",
                success: true,
                data: user,


            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error logging in", success: false, error });

    }

})
// apply for doctor API
router.post("/apply-doctor-account", authMiddleware, async (req, res) => {
    try {
        const newdoctor = new Doctor({ ...req.body, status: "pending" });
        await newdoctor.save();
        const adminUser = await User.findOne({ isAdmin: true });

        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: "new-doctor-request",
            message: `New Doctor ${req.body.firstName} ${req.body.lastName} has applied for doctor account`,
            data: {
                // newdoctor has the data from req.body
                doctorId: newdoctor._id,
                name: newdoctor.firstName + " " + newdoctor.lastName,
            },
            onClickPath: "/admin/doctorslist",
        })
        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
        res.status(200).send({
            message: "Doctor account applied successfully",
            success: true,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error applying doctor account", success: false, error });

    }
});

// mark notifications as seen
router.post("/mark-all-notifications-as-seen", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications = seenNotifications;
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "All notifications marked as seen",
            data: updatedUser,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error marking notifications as seen", success: false, error });

    }
});
// delete all notifications
router.post("/delete-all-notifications", authMiddleware, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.seenNotifications = [];
        user.unseenNotifications = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Notifications deleted",
            data: updatedUser,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error deleting notifications ", success: false, error });

    }
});
// same getdoctor api as in admin one just difference is we are getting only approved doctors here.
router.get("/get-all-approved-doctors", authMiddleware, async (req, res) => {
    try {
        const doctors = await Doctor.find({ status: "approved" });

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

//user books appointment api
router.post("/book-appointment", authMiddleware, async (req, res) => {
    try {
        req.body.status = "pending";
        // storing in isostring and also check availability api we are checking in iso string
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        const newAppointment = new Appointment(req.body);
        await newAppointment.save();
        // pushing notification to doctor based on his user id
        // find a user i.e doctor
        const user = await User.findOne({ _id: req.body.doctorInfo.userId });
        // only push notification to a doctor user
        user.unseenNotifications.push({
            type: "new-appointment-request",
            message: `New Appointment request from ${req.body.userInfo.name}`,
            onClickPath: "/doctor/appointments",

        }
        );
        await user.save();
        res.status(200).send({
            message: "Appointment booked successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error booking appointment ", success: false, error });

    }
});

// check availability
router.post("/check-booking-availability", authMiddleware, async (req, res) => {
    try {
        // before 1 hr and after 1 hr logic
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm").subtract(1, 'hours').toISOString();
        const toTime = moment(req.body.time, "HH:mm").add(1, 'hours').toISOString();
        const doctorId = req.body.doctorId;
        const appointments = await Appointment.find({
            doctorId,
            date,
            time: { $gte: fromTime, $lte: toTime },
            // status: "approved"
        });
        if (appointments.length > 0) {
            return res.status(200).send({
                message: "Appointment not available",
                success: false,
            })

        }
        else {
            return res.status(200).send({
                message: "Appointments available",
                success: true,
            })
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error booking appointment ", success: false, error });

    }
});

router.get("/get-appointments-by-user-id", authMiddleware, async (req, res) => {
    try {
        const appointments = await Appointment.find({ userId: req.body.userId });

        res.status(200).send({
            success: true,
            message: "Appointments Fetched Successfully",
            data: appointments,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching appointments ", success: false, error });

    }
});


module.exports = router;