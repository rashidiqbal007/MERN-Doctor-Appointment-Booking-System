// doctor appointment page and user appointment page are exactly same except doctor has ability in the columns 
// to approve or block appointment i.e change the status and also end points are changed to doctor and user receive the diff data
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast"
import Layout from "../../Components/Layout"
import { showLoading, hideLoading } from "../../redux/alertsSlice"
import { useState } from 'react';
import { message, Table } from 'antd';
import moment from 'moment';
function DoctorAppointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    // same function as doctor list getdoctor data get appointmentsdata in appointment.js
    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading())
            // user api shows appointments only to the users.
            const response = await axios.get("/api/doctor/get-appointments-by-doctor-id",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                });
            dispatch(hideLoading());
            // after getting response , we check if succes or error
            if (response.data.success) {
                // if success then set users to response.data.users
                setAppointments(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());

        }


    }
    // change appointment status function same as admin doctorlist.js ma change doc status kr rha hai
    const changeAppointmentStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/doctor/change-appointment-status", {
                appointmentId: record._id, status: status 
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                });
            dispatch(hideLoading());

            if (response.data.success) {
                toast.success(response.data.message);
                getAppointmentsData();
            }
        } catch (error) {
            toast.error("Error changing appointment status");
            dispatch(hideLoading());

        }


    }

    useEffect(() => {
        (getAppointmentsData())
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
        },
        {
            title: 'Patient',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.userInfo.name}
                </span>
            )
        },

        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.phoneNumber}
                </span>

            ),
        },
        {
            title: 'Date & Time',
            dataIndex: 'createdAt',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
                </span>

            ),
        },
        {
            title: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>
                    {/* a little changing than admin wala */}
                    {record.status === "pending" &&
                        <div className='d-flex' >
                            <h1 className='anchor px-2'  onClick={() =>

                                changeAppointmentStatus(record, "approved")}>Approve </h1>

                            <h1 className='anchor' onClick={() =>
                                changeAppointmentStatus(record, "rejected")}>Reject </h1>
                        </div>
                    }



                </div>
            )
        },

    ];

    return (
        <Layout>
            <h1 className='page-header'>Appointments</h1>
            <Table dataSource={appointments} columns={columns} />
        </Layout >
    )
}

export default DoctorAppointments