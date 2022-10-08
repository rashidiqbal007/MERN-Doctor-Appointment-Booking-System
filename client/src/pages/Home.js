import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Layout from '../Components/Layout'
import Doctor from '../Components/Doctor'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import { Row, Col } from 'antd'

function Home() {

  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(showLoading());
      //  payload has to be empty
      const response = await axios.get("/api/user/get-all-approved-doctors",
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
      dispatch(hideLoading());
      // agr response aya to hum ne setdoctor se doctor me dal dia and then doctor ko neeche prop bna kr doctor.js ma further data call krlia easy
      if (response.data.success) {
        setDoctors(response.data.data)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
    }
  }
  // so we will send api request with (headers everytime except login/register.)authorization and decrypt/split(in middleware) the token at backend if
  // token is valid then we will move to next else log error



  useEffect(() => {
    getData()


  }, []);




  return (
    <Layout>
      {/* whatever rendered inside layout component is prop/children that can be used anywhere in layout.js func comp */}
      <Row gutter={20}>

        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8} >
            {/* now rendering doctor component */}
            <Doctor doctor={doctor} />
          </Col>
        ))}
      </Row>
    </Layout>

  );
}

export default Home