import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';
import { hideLoading, showLoading } from '../redux/alertsSlice';
// we have created user in redux and calling here randomly so we can call username easily in next pages
// also, if any error in protectedtoute, we will be redirected to login page (reason: token is not valid)



// A component that can be used for any route that needs to be protected
function ProtectedRoute(props) {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUser = async () => {

        try {
            dispatch(showLoading())
            const response = await axios.post("/api/user/get-user-info-by-id", { token: localStorage.getItem("token") }
                ,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                } 

            );
            dispatch(hideLoading())
            if(response.data.success){
                // this is main part if we received user from the api we requested , we should put user in reducer
                // so we will dispatch user to reducer
                dispatch(setUser(response.data.data))
                // dispatched data from API to function called setUser of redux
            }
            else{
                localStorage.clear();
                navigate("/login")
            }
        } catch (error) {
            localStorage.clear();
            dispatch(hideLoading())
                navigate("/login")
        }
    }


    useEffect(() => {
if(!user){
    getUser()
}

    }, [user]);


    if (localStorage.getItem('token')) {
        return props.children;
    }
    else {
        // token ni ha
        return <Navigate to="/login" />;
    }
}
export default ProtectedRoute;