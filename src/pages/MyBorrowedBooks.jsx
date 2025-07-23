import React, { useEffect, useState } from "react";

const MyBorrowedBooks = () => {
  const [books, setBooks] = useState([]);

  const fetchMyBooks = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/issue/my`, {
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const returnBook = async (issueId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/issue/return/${issueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const data = await res.json();
    if (res.ok) {
      alert("✅ Returned successfully");
      fetchMyBooks(); // Update the UI without reload
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        📚 My Borrowed Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">
          🙁 You haven't borrowed any books yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((issue) => (
            <div
              key={issue._id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h4 className="text-xl font-bold text-indigo-600 mb-2 truncate">
                  {issue.bookId.title}
                </h4>
                <p className="text-gray-700 mb-1">
                  ✍️ <span className="font-semibold">Author:</span>{" "}
                  {issue.bookId.author || "Unknown"}
                </p>
                <p className="text-gray-700">
                  ⏳ <span className="font-semibold">Return Date:</span>{" "}
                  {issue.returnDate?.substring(0, 10) || "N/A"}
                </p>
              </div>

              <button
                onClick={() => returnBook(issue._id)}
                className="mt-4 bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
              >
                Return
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBorrowedBooks;

