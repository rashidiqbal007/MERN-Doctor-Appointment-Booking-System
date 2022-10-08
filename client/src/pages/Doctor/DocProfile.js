import React, { useEffect, useState } from 'react'
import DoctorForm from '../../Components/DoctorForm'
import Layout from "../../Components/Layout"
import axios from 'axios'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'


function DocProfile() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null)
  
  // onfinish is a post method for form that has been called in DoctorForm.js and endpoint is updateprofile
  const onFinish = async (values) => {
    // console.log("Success",values);
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/doctor/update-doctor-profile',
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
        console.log(doctor)
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
  // get doctor who is a user profile info.

  const getDoctorData = async () => {

    try {
      dispatch(showLoading())
      const response = await axios.post("/api/doctor/get-doctor-info-by-user-id", {
        userId: params.userId,
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


  useEffect(() => {

    getDoctorData()


  }, []);


  return (
    <Layout>
      <div className="page-title">Doctor Profile</div>
      <hr />
      {/* if doctor we will fetch else it will crash */}
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  )
}

export default DocProfile