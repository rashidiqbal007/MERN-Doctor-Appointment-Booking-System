import Layout from '../Components/Layout';
import React from 'react'
import {  Tabs,TabPane } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import toast from 'react-hot-toast';
import { setUser } from '../redux/userSlice';

function Notifications() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    // mark all as seen function
    const markAllasSeen = async () => {
        try {
            dispatch(showLoading())
            // userid to clear all notifications
            const response = await axios.post('/api/user/mark-all-notifications-as-seen', {userId : user._id},
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`    
                }
                }
            )
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                // refreshing user data
                dispatch(setUser(response.data.data))

            }
            else {
                toast.error(response.data.message)
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong")
        }
    }

    const deleteAll = async () => {
        try {
            dispatch(showLoading())
            // userid to clear all notifications
            const response = await axios.post('/api/user/delete-all-notifications', {userId : user._id},
                {headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`    
                }
                }
            )
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                // refreshing user data
                dispatch(setUser(response.data.data))

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
        <Layout>
            <Tabs>
                <Tabs.TabPane tab="unseen" key={0} >
                    <h2>Unseen</h2>
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor " onClick={() => markAllasSeen()}>
                            Mark all as seen
                        </h1>
                    </div>
                    {user?.unseenNotifications.map((notification) => (
                        <div className="card p-2 mt-2" onClick={() => navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>

                <Tabs.TabPane tab="seen" key={1} >
                    <h2>seen</h2>
                    <div className="d-flex justify-content-end">
                        <h1 className="anchor " onClick={()=> deleteAll()}>
                            Delete All
                        </h1>
                    </div>
                    {user?.seenNotifications.map((notification) => (
                        <div className="card p-2 mt-2" onClick={() => navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notifications