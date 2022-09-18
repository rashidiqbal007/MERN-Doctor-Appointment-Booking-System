import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {toast} from "react-hot-toast"
import Layout from '../../Components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { useState } from 'react';
import { message, Table } from 'antd';


function DoctorsList() {
    const dispatch = useDispatch();
    // initially set empty array to fetch users.
    const [doctors, setDoctors] = useState([])
    const getDoctorsData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/api/admin/get-all-doctors",
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                });
            dispatch(hideLoading());
            // after getting response , we check if succes or error
            if (response.data.success) {
                // if success then set users to response.data.users
                setDoctors(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());

        }


    }
    // record is from the columns array
    const changeDoctorStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/admin/change-doctor-status", {
                doctorId: record._id, userId: record.userId, status: status
            },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                });
            dispatch(hideLoading());
            // after changing doctor status we have to get all the doctors again to show updated status. 
            if (response.data.success) {
                toast.success(response.data.message);
                getDoctorsData();
            }
        } catch (error) {
            toast.error("Error changing doctor status");
            dispatch(hideLoading());

        }


    }


    useEffect(() => {
        (getDoctorsData())
    }, []);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text, record) => (
                <span>
                    {record.firstName} {record.lastName}
                </span>
            )
        },

        {
            title: 'Phone',
            dataIndex: 'phoneNumber',


        },
        {
            title: 'createdAt',
            dataIndex: 'createdAt',
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

                    {record.status === "pending" && <h1 className='anchor' onClick={() => changeDoctorStatus(record, "approved")}>Approve </h1>}
                    {record.status === "approved" && <h1 className='anchor' onClick={() => changeDoctorStatus(record, "blocked")}>Block </h1>}


                </div>
            )
        },
    ];




    return (
        <Layout>
            <h1 className='page-header'>Doctors List</h1>
            <Table dataSource={doctors} columns={columns} />
        </Layout >
    )
}


export default DoctorsList