import React, { useState, useEffect } from 'react'
import Layout from '../Components/Layout'
import { showLoading, hideLoading } from '../redux/alertsSlice'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, Row, Col, Button } from 'antd';
import moment from 'moment';
import toast from 'react-hot-toast';


function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const { user } = useSelector((state) => state.user);
    const [doctor, setDoctor] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    // same getdoctordata function as in DocProfile.js but API endpoint is get-doctor-info-by-id
    // the doctor data to book appointment
    const getDoctorData = async () => {

        try {
            dispatch(showLoading())
            const response = await axios.post("/api/doctor/get-doctor-info-by-id", {
                doctorId: params.doctorId,
            },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }

            );
            dispatch(hideLoading())
            if (response.data.success) {
                // this is main part if we received user from the api we requested , we should put user in reducer
                // so we will dispatch user to reducer
                setDoctor(response.data.data)
                // dispatched data from API to function called setUser of redux
            }

        } catch (error) {
            console.log(error)

            dispatch(hideLoading())

        }
    }
    // check availability function
    const checkAvailability = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/check-booking-availability", {
                doctorId: params.doctorId,
                date: date,
                time: time,
            },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }

            );
            dispatch(hideLoading())
            if (response.data.success) {
                // this is main part if we received user from the api we requested , we should put user in reducer
                // so we will dispatch user to reducer
                toast.success(response.data.message);

                // agar appointment available hai(true returned) to isAvailable true ho jayega aur book appointment button show ho jayega 
                // aur niche book now ma pass krden ge check k agr isavailable true hai to show button elsenot
                setIsAvailable(true);
            }
            else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error)
            toast.error("Error booking appointment")
            dispatch(hideLoading())

        }
    }

    // this func runs when clicked book now and we are sending this data to backend also check the model of appointmentModel.js
    const bookNow = async () => {
        setIsAvailable(false);
        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/book-appointment", {
                doctorId: params.doctorId,
                userId: user._id,
                doctorInfo: doctor,
                userInfo: user,
                date: date,
                time: time,
            },

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                }

            );
            dispatch(hideLoading())
            if (response.data.success) {
                // this is main part if we received user from the api we requested , we should put user in reducer
                // so we will dispatch user to reducer
                toast.success(response.data.message);
                // dispatched data from API to function called setUser of redux
            }

        } catch (error) {
            console.log(error)
            toast.error("Error booking appointment")
            dispatch(hideLoading())

        }
    }


    useEffect(() => {

        getDoctorData()


    }, []);

    return (
        <Layout>
            {doctor && (
                <div>
                    <h4 className="page-title">{doctor.firstName} {doctor.lastName}</h4>
                    <hr />
                    <Row>
                        <Col span={12} sm={24} xs={24} lg={8}>
                            {!doctor.timings ? null : (<h1 className="normal-text"><b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}</h1>
                            )}
                            {/* <h1 className="normal-text"><b>Timings: </b>  {doctor.timings[0]}-{doctor.timings[1]}</h1> */}

                            <div className="d-flex flex-column pt-2">
                                <DatePicker format="DD-MM-YYYY" onChange={(value) => {
                                    setDate(moment(value).format("DD-MM-YYYY"));
                                    // agar date change ho to isAvailable false ho jayega aur book appointment button hide ho jayega
                                    setIsAvailable(false)
                                }
                                }

                                />

                                <TimePicker format="HH:mm" className="mt-3"
                                    onChange={(value) => {
                                        setIsAvailable(false);
                                        setTime
                                            (moment(value).format("HH:mm"),
                                            );
                                    }} />
                                <Button className='secondary-button mt-3 full-width-button' onClick={checkAvailability}>
                                    Check Availability
                                </Button>
                                {isAvailable && (
                                    <Button className='secondary-button mt-3 full-width-button' onClick={bookNow} >
                                        Book Now
                                    </Button>)}
                            </div>
                        </Col>
                    </Row>
                </div>
            )
            }
        </Layout>

    )
}

export default BookAppointment