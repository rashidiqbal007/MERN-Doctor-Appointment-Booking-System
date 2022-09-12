import React from 'react'
import "../../src/Layout.css"

function Layout({ children }) {
    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "fas fa-home",
        },
        {
            name: "Appointments",
            path: "/appointments",
            icon: "fas fa-calendar-alt",
        },
        {
            name: "Apply Doctor",
            path: "/apply-doctor",
            icon: "fas fa-user-md",
        },
        {
            name: "Profile",
            path: "/profile",
            icon: "fas fa-user",
        },
        {
            name: "Logout",
            path: "/logout",
            icon: "fas fa-sign-out-alt",
        }

    ]

const menuToBeRendered = userMenu;


    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className="sidebar">
                    <div className="sidebar-header">
                        VISION-X
                    </div>
                    <div className="menu">

                    </div>
                </div>
                <div className="content">
                    <div className="header">
                        header
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