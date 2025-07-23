// 📁 src/components/MyNavbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MyContext from '../context/myContext';

const MyNavbar = () => {
  const { setToken,setUser } = useContext(MyContext);
  const navigate = useNavigate();
    const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
   

    navigate('/login');
  };
  const user = JSON.parse(localStorage.getItem('user'));
console.log(user); // Object আকারে user পাবে

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side */}
          <div className="flex space-x-6 items-center">
            <Link to="/" className="no-underline text-xl font-bold text-blue-600 hover:text-blue-800"> <img width={"40px"} src="https://cdn-icons-png.flaticon.com/512/2784/2784539.png" alt="" /> </Link>
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            
        

            {user?.role === "student" && (
              <Link to="/user-dashboard" className="text-gray-700 hover:text-blue-600">Get Book</Link>
              


              
            )}



            {user?.role === "student" && (
              <Link to="/user-books" className="text-gray-700 hover:text-blue-600">My Books</Link>
              


              
            )}


            {user?.role === "admin" && (
              <Link to="/admin-dashboard" className="text-gray-700 hover:text-blue-600">Admin Dashboard</Link>
            )}
          </div>

          {/* Right Side */}
          <div className="flex space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded  hover:text-white transition">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Sign Up</Link>
              </>
            ) : (
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MyNavbar;
