import React from 'react'
import {Form,Input,Button} from "antd"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { showLoading , hideLoading} from '../redux/alertsSlice'

function Register() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/register' , values)
      dispatch(hideLoading())
      if(response.data.success){
        toast.success(response.data.message)
        toast("Redirecting to Login page");
        navigate("/login")

      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong")
    }
    
  }
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        
        <h1 className='card-title'>Register to Vision-X</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label = "Name" name = "name">
            <Input placeholder = "Name"/>
          </Form.Item>

          <Form.Item label = "Email" name = "email">
            <Input placeholder = "Email"/>
          </Form.Item>

          <Form.Item  label = "Password" name = "password">
            <Input type='password' placeholder = "Password"/>
          </Form.Item>

         <div className="d-flex flex-column">
         <Button className='full-width-button my-2 ' htmlType="submit">Register</Button>

<Link to='/login' className="anchor p-2 justify-content-end">Click here to Login</Link>
         </div>
        </Form>
      

      </div>

    </div>
  )
}

export default Register
