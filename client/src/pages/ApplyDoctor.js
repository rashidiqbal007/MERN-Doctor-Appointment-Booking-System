import Layout from '../Components/Layout'
import React from 'react'
import { Row, Col, Form, Input, TimePicker, Button } from 'antd'
import axios from 'axios'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { useNavigate } from 'react-router-dom'
import DoctorForm from '../Components/DoctorForm'
import moment from 'moment'

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const onFinish = async (values) => {
        // console.log("Success",values);
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/apply-doctor-account',
                {
                    ...values, userId: user._id,
                    timings: [
                        // changing display format of date 0 index is from & 1 index is to
                        moment(values.timings[0]).format('HH:mm'),
                        moment(values.timings[1]).format('HH:mm'),
                    ]
                }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                // toast("Redirecting to Login page");
                navigate("/")

            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }
    return (
        <Layout >
            <h1 className='page-title'>Apply For a Doctor</h1>
            <hr></hr>
            <DoctorForm onFinish={onFinish} />
        </Layout>
    )
}

export default ApplyDoctor