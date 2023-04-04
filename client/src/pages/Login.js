import React from 'react'
import { Form, Input, Button } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import toast from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'


function Login() {
  // redux alertloader
  const dispatch = useDispatch()
  // const {loading}  = useSelector(state => state.alerts)
  // console.log(loading)
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      // wait kro response ka jo request bheji ha
      const response = await axios.post('/api/user/login', values)
      // whatever is the response we need to hideloader
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        toast("Redirecting to Home page");
        // put info you are getting from the backend in the local storage
        // data.data is getting token from login post API
        localStorage.setItem("token", response.data.data);
        navigate("/")

      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong")
    }

  }

  return (
    <div className='authentication'>
      {/* <img src={backgroundimage} alt="" className="background" /> */}
      <div className='authentication-form card p-3'>


        <h1 className='card-title'>Login to Vision-X</h1>
        <Form layout="vertical" onFinish={onFinish}>


          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input type='password' placeholder="Password" />
          </Form.Item>

          <div className="d-flex flex-column">
            <Button className='full-width-button my-2' id = "register-button" htmlType="submit">Login</Button>

            <Link to='/register' id="register-tag" className="anchor p-2 ">Click here to Register</Link>
          </div>
        </Form>


      </div>

    </div>
  )
}

export default Login
