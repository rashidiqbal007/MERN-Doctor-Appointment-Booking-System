import Layout from '../Components/Layout'
import React from 'react'
import { Row, Col, Form, Input, TimePicker, Button } from 'antd'
import axios from 'axios'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { useNavigate } from 'react-router-dom'

function ApplyDoctor() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const onFinish = async (values) => {
        // console.log("Success",values);
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/apply-doctor-account', { ...values, userId: user._id },{
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
            <Form layout="vertical" onFinish={onFinish}>
                <h4>Personal Information</h4>

                <Row gutter={20}>
                    {/* so antd has 24 columns in total we need three for each i.e 8*3 */}
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="First Name" name="firstName" rules={[{ required: true }]}>
                            <Input placeholder='First Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Last Name" name="lastName" rules={[{ required: true }]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Phone Number" name="phoneNumber" rules={[{ required: true }]}>
                            <Input placeholder='Phone Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Website" name="website" rules={[{ required: true }]}>
                            <Input placeholder='Website' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
                            <Input placeholder='Address' />
                        </Form.Item>
                    </Col>

                </Row>

                <hr />
                <h4>Professional Information</h4>
                <Row gutter={20}>
                    {/* so antd has 24 columns in total we need three for each i.e 8*3 */}
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Specialization" name="specialization" rules={[{ required: true }]}>
                            <Input placeholder='Specialization' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Experience" name="experience" rules={[{ required: true }]}>
                            <Input placeholder='Experience' type='Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Consultation Fee" name="feePerConsultation" rules={[{ required: true }]}>
                            <Input placeholder='Consultaion Fee' type='Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Timings" name="timings" rules={[{ required: true }]}>
                            <TimePicker.RangePicker />
                        </Form.Item>
                    </Col>




                </Row>
                <div className="d-flex justify-content-end">
                    <Button className="primary-button" htmlType='submit' >
                        Submit
                    </Button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor