import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [report, setReport] = useState(null);
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "", isbn: "", stock: 1 });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchReport = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin`, {
        headers: {      "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')  },
      });
      const data = await res.json();
      console.log(data)
      setReport(data);
    } catch (err) {
      toast.error("Failed to load report");
    }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      toast.error("Failed to load books");
    }
  };



  const handleAddBook = async () => {
  const randomIsbn = Math.random().toString(36).substring(2, 10).toUpperCase();

  const bookToSend = {
    ...newBook,
    isbn: randomIsbn, // new ISBN added here
  };

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(bookToSend),
    });

    if (!res.ok) throw new Error("Failed to add book");

    toast.success("Book added");

    // reset form
    setNewBook({
      title: "",
      author: "",
      genre: "",
      isbn: "", // not needed since you'll regenerate next time
      stock: 1,
    });

    fetchBooks();
  } catch (err) {
    toast.error(err.message);
  }
};







  const handleDeleteBook = async (id) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
        method: "DELETE",
        headers: {       "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')  },
      });
      if (!res.ok) throw new Error("Failed to delete book");
      toast.success("Book deleted");
      fetchBooks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleUpdateBook = async (id, updatedData) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token') 
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Book updated");
      fetchBooks();
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchReport();
    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

      {report && (
        <div className="mb-6">
          <p>Total Users: {report.totalUsers}</p>
          <p>Total Books: {report.totalBooks}</p>
          <p>Total Issued Books: {report.totalIssuedBooks}</p>
          <p>Returned Books: {report.returnedBooks}</p>
          <p>Pending Returns: {report.pendingReturns}</p>
          <p>Overdue Books: {report.overdueBooks}</p>
          <p>
            Most Issued Book: {report.mostIssuedBook?.title || "None"} ({
              report.mostIssuedBook?.issueCount || 0
            } times)
          </p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold">Add New Book</h3>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="border p-1 m-1"
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="border p-1 m-1"
        />

              <input
          type="text"
          placeholder="genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
          className="border p-1 m-1"
        />


        <input
          type="number"
          placeholder="Stock"
          value={newBook.stock}
          onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
          className="border p-1 m-1"
        />
        <button
          onClick={handleAddBook}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <div>
        <h3 className="font-semibold mb-2">All Books</h3>
        <ul>
          {books.map((book) => (
            <li key={book._id} className="mb-2 border p-2">
              <strong>{book.title}</strong> by {book.author} | Stock: {book.stock}
              <div className="mt-2">
                <button
                  onClick={() => handleDeleteBook(book._id)}
                  className="bg-red-500 text-white px-2 py-1 mr-2"
                >
                  Delete
                </button>
             
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
