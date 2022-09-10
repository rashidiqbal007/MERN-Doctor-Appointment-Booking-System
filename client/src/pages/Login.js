import React from 'react'
import {Form,Input,Button} from "antd"
import {Link , useNavigate} from "react-router-dom"
import axios from 'axios'
import toast from "react-hot-toast"

function Login() {
    const navigate = useNavigate();
    const onFinish = async(values) => {
      try {
        const response = await axios.post('/api/user/login' , values)
        if(response.data.success){
          toast.success(response.data.message)
          toast("Redirecting to Home page");
          // put info you are getting from the backend in the local storage
          // data.data is getting token from login post API
          localStorage.setItem("token", response.data.data);
          navigate("/")
  
        }
        else{
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error("Something went wrong")
      }
      
    }
  
  return (
    <div className='authentication'>
      <div className='authentication-form card p-3'>
        
        
        <h1 className='card-title'>Login to Vision-X</h1>
        <Form layout="vertical" onFinish={onFinish}>
         

          <Form.Item label = "Email" name = "email">
            <Input placeholder = "Email"/>
          </Form.Item>

          <Form.Item  label = "Password" name = "password">
            <Input type='password' placeholder = "Password"/>
          </Form.Item>

          <Button className='primary-button my-2' htmlType="submit">Login</Button>

          <Link to='/register' className="anchor p-2 ">Click here to Register</Link>
        </Form>
      

      </div>

    </div>
  )
}

export default Login
