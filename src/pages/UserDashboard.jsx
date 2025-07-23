import React, { useContext, useEffect } from "react";
import MyContext from "../context/myContext";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { blogs, fetchBlogs,setBlogs } = useContext(MyContext);

  // Borrow book function
  const borrowBook = async (bookId) => {
    try {
      const returnDate = "2025-08-25";

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ bookId, returnDate }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("📚 Book borrowed successfully!");
          // ✅ Update the stock locally without reload
      const updatedBlogs = blogs.map((book) =>
        book._id === bookId
          ? { ...book, stock: book.stock - 1 }
          : book
      );

      setBlogs(updatedBlogs);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  // Fetch blogs on mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* User info */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-indigo-300">
          🙋‍♂️ Welcome,{" "}
          <span className="underline decoration-indigo-500">
            {user ? user.name : "Loading..."}
          </span>
        </h1>
        <p className="text-indigo-500 text-lg mt-1">
         Your Role:{" "}
          <span className="capitalize font-semibold">
            {user?.role || "N/A"}
          </span>
        </p>
      </div>

      {/* Books Grid */}
      {!blogs || blogs.length === 0 ? (
        <p className="text-center text-gray-500 text-xl mt-20">
          🙁 কোনো বই পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-xl font-bold text-gray-600 mb-2 truncate">
                  {book.title || "No Title"}
                </h2>
                <p className="text-gray-700 mb-1">
                  ✍️ <span className="font-semibold">Author:</span>{" "}
                  {book.author || "অজানা"}
                </p>
                <p className="text-gray-700 mb-3">
                  📦 <span className="font-semibold">Stock:</span>{" "}
                  {book.stock ?? "N/A"}
                </p>
              </div>

              {/* Borrow button or Not Available */}
              {book.stock > 0 ? (
                <button
                  onClick={() => borrowBook(book._id)}
                  className="mt-auto bg-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Borrow
                </button>
              ) : (
                <p className="mt-auto text-red-600 font-semibold text-center">
                  Not Available
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
