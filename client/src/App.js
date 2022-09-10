import React from "react";
import { Button } from 'antd'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.js"
import Register from "./pages/Register";
import Home from "./pages/Home.js";
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster reverseOrder={false} position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


        </Routes>

      </BrowserRouter>


    </div>
  );
}

export default App;
