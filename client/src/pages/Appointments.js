import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from "react-hot-toast"
import Layout from '../Components/Layout'
import { showLoading, hideLoading } from "../redux/alertsSlice"
import { useState } from 'react';
import { message, Table } from 'antd';
import moment from 'moment';
function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();

    // same function as doctor list getdoctor data
    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading())
            // user api shows appointments only to the users.
            const response = await axios.get("/api/user/get-appointments-by-user-id",
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

    useEffect(() => {
        (getAppointmentsData())
    }, []);

    const columns = [
        {
            title: 'id',
            dataIndex: '_id',
        },
        {
            title: 'Doctor',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
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
       
    ];

    return (
        <Layout>
            <h1 className='page-header'>Appointments</h1>
            <Table dataSource={appointments} columns={columns} />
        </Layout >
    )
}

export default Appointments