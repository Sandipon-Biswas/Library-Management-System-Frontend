// 📁 src/pages/Login.jsx
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import MyContext from '../context/myContext';



const Login = () => {
    const {login}=useContext(MyContext);
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  



  ///function 

 

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
   

      if (res.ok) {
        navigate("/"); 
       const { token, name, role } = data;
        const user = { name, role };
 
        login(token, user); // context এ লগিন করিয়ে দাও
        // success হলে dashboard এ পাঠিয়ে দাও
        alert("login successful")
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };





  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring focus:border-blue-500"
          required
                      value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring focus:border-blue-500"
          required
                     value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
