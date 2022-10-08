const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel")
const Appointment = require("../models/appointmentModel")
const User = require("../models/userModel")
const authMiddleware = require("../Middlewares/authMiddlewares")



router.post("/get-doctor-info-by-user-id", authMiddleware, async (req, res) => {
    try {
        // find kro jis user ne protected route req kia ha does he exist?
        const doctor = await Doctor.findOne({ userId: req.body.userId });

        res.status(200).send(
            {
                success: true,
                message: "Doctor Info Fetched Successfully",
                data: doctor,

            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching doctor indo", success: false, error });

    }

});
// using in client\src\pages\BookAppointment.js & same api as above one user-id
router.post("/get-doctor-info-by-id", authMiddleware, async (req, res) => {
    try {
        // find kro jis user ne protected route req kia ha does he exist?
        const doctor = await Doctor.findOne({ _id: req.body.doctorId });

        res.status(200).send(
            {
                success: true,
                message: "Doctor Info Fetched Successfully",
                data: doctor,

            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching doctor indo", success: false, error });

    }

});

router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
    try {
        // find kro jis user ne protected route req kia ha does he exist?
        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId },
            req.body);

        res.status(200).send(
            {
                success: true,
                message: "Doctor Info Updated Successfully",
                data: doctor,

            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating doctor indo", success: false, error });

    }

});
// appointment doctor page api doctorappointment.js
router.get("/get-appointments-by-doctor-id", authMiddleware, async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId });
        const appointments = await Appointment.find({ doctorId: doctor._id });

        res.status(200).send({
            success: true,
            message: "Doctor Appointments Fetched Successfully",
            data: appointments,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching Doctor appointments ", success: false, error });

    }
});

// changeappointment status api same as change doctor status api
router.post("/change-appointment-status", authMiddleware, async (req, res) => {
    try {
        // doctorid is uniquely generated in doctor model when a user applies for a doctor.
        // status is pending. This is what admin received now admin notifies user that he is approved or rejected.
        // we already have userid in the appointmentid/info
        const { appointmentId, status } = req.body;
        // note: previously we were only findbyID so it was not approving 
        const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
            status,
        });

        // find user (note userid if written it will fetch admin userid & send notifications to admin from middleware, so we write doctor.userid)and push notifications to unseen tab of user
        const user = await User.findOne({ _id: appointment.userId });
        // same code as applydoc api just change admin user to user(bcz now we are notifying user)
        const unseenNotifications = user.unseenNotifications;
        unseenNotifications.push({
            type: "appointment-status-changed",
            message: `Your appointment has been ${status}`,
            onClickPath: "/appointments",
        })
       

        // await User.findByIdAndUpdate(user._id, { unseenNotifications });
        await user.save();

        res.status(200).send({
            message: "Appointment status updated successfully",
            success: true,
            
        });




    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error changing the appointment status ", success: false, error });

    }
});












module.exports = router;