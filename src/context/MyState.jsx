// 📁 src/context/MyState.jsx
import React, { useState, useEffect } from 'react';
import MyContext from './myContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MyState = ({ children }) => {
  const navigate = useNavigate();

  
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  // all blogs
    const fetchBlogs = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
    const data = await res.json();
    console.log(data)
    setBlogs(data);
  };


  // 🔐 Login function
  const login = (token, userInfo) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userInfo));
    setToken(token);
    //setUser(userInfo);
    toast.success('Login successful!');
  };

  // 🔓 Logout function


  // 🧠 Server থেকে logged in user আনবে (JWT দিয়ে)


  return (
    <MyContext.Provider value={{  token, login, loading,setToken,blogs,fetchBlogs,setBlogs }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyState;
