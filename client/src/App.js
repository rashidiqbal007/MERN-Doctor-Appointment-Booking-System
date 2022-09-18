import React from "react";
import { Button } from 'antd'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js"
import Register from "./pages/Register";
import Home from "./pages/Home.js";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import PublicRoute from "./Components/PublicRoute.js";
import ApplyDoctor from "./pages/ApplyDoctor.js";
import Notifications from "./pages/Notifications.js";
import DoctorsList from "./pages/Admin/DoctorsList.js";
import UsersList from "./pages/Admin/UsersList.js";
import Profile from "./pages/Profile.js";


function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <div>
      <BrowserRouter>
        {loading && <div className="spinner-parent">
          <div className="spinner-grow text-info" role="status">
          </div>
        </div>}
        <Toaster reverseOrder={false} position="top-center" />
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/admin/doctorslist" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
          <Route path="/admin/userslist" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        </Routes>

      </BrowserRouter>

    </div>

  );
}

export default App;
