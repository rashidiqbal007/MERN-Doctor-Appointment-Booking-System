import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import Layout from '../../Components/Layout'
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

function UsersList() {
    // initially set empty array to fetch users.
    const [users, setUsers] = useState([])
    const dispatch = useDispatch();

    const getUsersData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get("/api/admin/get-all-users", 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,

                    }
                });
            dispatch(hideLoading());
            // after getting response , we check if succes or error
            if (response.data.success) {
                // if success then set users to response.data.users
                setUsers(response.data.data)
            }
        } catch (error) {
            dispatch(hideLoading());

        }



    }

        useEffect(() => {
            getUsersData()
        }, []);
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
            },
            {
                title: 'createdAt',
                dataIndex: 'createdAt',
            },
            {
                title: 'Actions',
                dataIndex: 'actions',
                render: (text, record) => (
                    <div className='d-flex'>
                        <h1 className='anchor'>
                            Block.
                        </h1>
                    </div>
                )},
        ];



    
        return(
            <Layout>
                <h1 className='page-header'>Users List</h1>
            <Table columns={columns}  dataSource={users}/>
            </Layout >
        )
}


export default UsersList