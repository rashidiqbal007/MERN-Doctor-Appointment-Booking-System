import { Row, Col, Form, Input, TimePicker, Button } from 'antd'
import React from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import moment from 'moment'


// same form for update doctor and apply doctor page

function DoctorForm({onFinish, initialValues}) {
// not making component of on finish because it is different in both apply doc and docprofile
    return (
        <Form layout="vertical" onFinish={onFinish} initialValues = 
        {{...initialValues,
           ...(initialValues && {
            timings: [
                // converting format of timing as supported 
                moment(initialValues?.timings[0], 'HH:mm'),
                moment(initialValues?.timings[1], 'HH:mm'),
            ]
           }) 
           
           
           }}>
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
                        <TimePicker.RangePicker format='HH:mm'/>
                    </Form.Item>
                </Col>




            </Row>
            <div className="d-flex justify-content-end">
                <Button className="primary-button" htmlType='submit' >
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default DoctorForm