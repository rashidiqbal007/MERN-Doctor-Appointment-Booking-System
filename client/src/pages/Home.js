import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Layout from '../Components/Layout'

function Home() {
  const getData = async () => {
    try {
                                                             //  payload has to be empty
      const response = await axios.post("/api/user/get-user-info-by-id", {} ,
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
      console.log(response.data)
    } catch (error) {
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
       <h1>Homepage</h1>
    </Layout>
   
  )
}

export default Home