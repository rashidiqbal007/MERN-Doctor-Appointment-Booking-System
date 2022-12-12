import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../../src/Layout.css"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from 'antd'
// children is a prop that we will pass to Layout component in App.js i.e body section below
function Layout({ children }) {

    const navigate = useNavigate;
    const { user } = useSelector((state) => state.user)
    const unseenNotificationslength = user?.unseenNotifications?.length;
    // console.log(user);
    const [Collapsed, setCollapsed] = useState(false);
    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "ri-file-list-line",
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "ri-hospital-line",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-line",
        }

    ]
    const adminMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Users",
            path: "/admin/userslist",
            icon: "ri-user-line",
        },
        {
            name: "Doctors",
            path: "/admin/doctorslist",
            icon: "ri-hospital-line",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "ri-user-line",
        }


    ]
    const DoctorMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Appointments",
            path: "/doctor/appointments",
            icon: "ri-file-list-line",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon: "ri-user-line",
        }

    ]
    // this is bcz to check which menu is it and then render that one
    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? DoctorMenu : userMenu;
    const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User";

    return (
        <div className='main'>
            <div className='d-flex layout'>
                {/* agr collapsed state true hui to col-sidebar call hogi class wrna only sidebar */}
                {/* this is an option too to collapse <div className={`${Collapsed ? 'collapsed-sidebar' : 'sidebar'}`}> */}
                <div className="sidebar">
                    <div className="sidebar-header">
                        VISION-X
                    </div>
                    <h1 className="role">{role}</h1>
                    <div className="menu">
                        {/* mapping the icons etc from the usermenu array */}
                        {menuToBeRendered.map((menu) => {
                            return <div className='d-flex menu-item'>
                                <i className={menu.icon}></i>
                                {/* if collapsed ni ha only then show all icon */}
                                {!Collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        }
                        )}
                        <div className='d-flex menu-item'>
                            <i className="ri-eye-2-line" ></i>
                            {!Collapsed && <a href='https://visionxgazekeyboard.netlify.app/' target="_blank" >Virtual Keyboard</a>}
                        </div>
                        <div className='d-flex menu-item'>
                            <i className="ri-body-scan-line"></i>
                            {!Collapsed && <a href='https://visionxgazekeyboard.netlify.app/' target="_blank" >Gesture</a>}
                        </div>
                        <div className='d-flex menu-item' onClick={() => {
                            localStorage.clear();
                            navigate('/')
                        }

                        }>
                            <i className="ri-logout-circle-line"></i>
                            {!Collapsed && <Link to='/login'>Logout</Link>}
                        </div>




                    </div>
                </div>
                <div className="content">
                    {/* header section */}

                    <div className="header">
                        {Collapsed ? <i className="ri-menu-2-fill remix-icons " onClick={() => setCollapsed(false)}></i>
                            : (<i className="ri-close-fill remix-icons " onClick={() => setCollapsed(true)}></i>
                            )}
                        <div className="d-flex align-items-center px-4">
                            {/* user is special user that has admin access */}
                            {/* <i className="badge" onClick={() => navigate("/notifications")}> */}
                            <a className="badge" href='/notifications' >

                                <Badge count={unseenNotificationslength} >
                                    <i className="ri-notification-line remix-icons px-3"></i>

                                </Badge>
                            </a>
                            {/* </i> */}
                            {/* calling user */}
                            <Link to={"/profile"} className="anchor mx-2" >{user?.name}</Link>
                        </div>
                    </div>

                    <div className="body">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout