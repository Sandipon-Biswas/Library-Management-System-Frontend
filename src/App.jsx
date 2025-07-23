
import React from 'react';
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import './App.css'
import MyState from './context/MyState';

import Home from './pages/Home';
import MyNavbar from './components/MyNavbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBorrowedBooks from './pages/MyBorrowedBooks';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  
  return (
    <>
    <Router>
   
      <MyState>
        <MyNavbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
         
           <Route path="/user-dashboard" element={< UserDashboard />} />
               <Route path="/user-books" element={< MyBorrowedBooks />} />
        <Route path="/admin-dashboard" element={< AdminDashboard />} />
          {/*  <Route path="/edit/:id" element={<EditBlog />} />
        */}
        </Routes>
      </MyState>
      
    
    </Router>
    </>
  )
}

export default App
