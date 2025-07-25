import React, { useContext, useEffect } from 'react'
import MyContext from '../context/myContext';
import Counter from '../components/Counter';

const Home = () => {
        const {blogs,fetchBlogs}=useContext(MyContext);
useEffect(() => {
  fetchBlogs();
}, []);
      
  return (
    <>
    <Counter/>
   <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Empty State */}
      {!Array.isArray(blogs) || blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg md:text-xl font-semibold mt-20">
          🙁 কোনো বই পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            >
              <h2 className="text-xl font-bold text-indigo-600 mb-2 truncate">
                {blog.title || "No Title"}
              </h2>
              <h3 className="text-sm text-gray-500 mb-4">
                লেখক: {blog.author || "অজানা"}
              </h3>
              <p className="text-gray-700 mb-1">
                📚 <span className="font-semibold">Genre:</span>{" "}
                {blog.genre || "N/A"}
              </p>
              <p className="text-gray-700 mb-1">
                📖 <span className="font-semibold">ISBN:</span> {blog.isbn || "N/A"}
              </p>
              <p className="text-gray-700">
                📦 <span className="font-semibold">স্টকে আছে:</span>{" "}
                {blog.stock != null ? `${blog.stock} কপি` : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default Home
