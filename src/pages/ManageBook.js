// ManageBook.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageBook = () => {
  // State variables for managing form data and book data
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [searchId, setSearchId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');
  const [editIsbn, setEditIsbn] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPublishedDate, setEditPublishedDate] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newIsbn, setNewIsbn] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPublishedDate, setNewPublishedDate] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [newLocation, setNewLocation] = useState('');

  // Function to fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to search for a book by ID
  const searchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/books/${searchId}`);
      setBooks([response.data]); // Set to an array for consistent rendering
    } catch (error) {
      console.error("Error searching book:", error);
    }
  };

  // Function to edit a book by ID
  const editBook = async () => {
    try {
      const updatedBook = {
        title: editTitle,
        author: editAuthor,
        isbn: editIsbn,
        category: editCategory,
        publishedDate: editPublishedDate,
        status: editStatus,
        location: editLocation
      };
      await axios.put(`http://localhost:5000/api/books/${bookId}`, updatedBook);
      alert('Book updated successfully!');
      fetchBooks(); // Refresh the list of books
    } catch (error) {
      console.error("Error editing book:", error);
    }
  };

  // Function to delete a book by ID
  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`);
      alert('Book deleted successfully!');
      fetchBooks(); // Refresh the list of books
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  // Function to add a new book
  const addBook = async () => {
    try {
      const newBook = {
        title: newTitle,
        author: newAuthor,
        isbn: newIsbn,
        category: newCategory,
        publishedDate: newPublishedDate,
        status: newStatus,
        location: newLocation
      };
      await axios.post('http://localhost:5000/api/books', newBook);
      alert('Book added successfully!');
      fetchBooks(); // Refresh the list of books
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  // Run fetchBooks when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Manage Books</h2>

      {/* Button to show all books */}
      <button onClick={fetchBooks}>Show All Books</button>

      {/* Search Book by ID */}
      <div>
        <label>Search Book ID: </label>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={searchBook}>Search Book</button>
      </div>

      {/* Edit Book by ID */}
      <div>
        <label>Book ID to Edit: </label>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <label>New Title: </label>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label>New Author: </label>
        <input
          type="text"
          value={editAuthor}
          onChange={(e) => setEditAuthor(e.target.value)}
        />
        <label>New ISBN: </label>
        <input
          type="text"
          value={editIsbn}
          onChange={(e) => setEditIsbn(e.target.value)}
        />
        <label>New Category: </label>
        <input
          type="text"
          value={editCategory}
          onChange={(e) => setEditCategory(e.target.value)}
        />
        <label>New Published Date: </label>
        <input
          type="text"
          value={editPublishedDate}
          onChange={(e) => setEditPublishedDate(e.target.value)}
        />
        <label>New Status: </label>
        <input
          type="text"
          value={editStatus}
          onChange={(e) => setEditStatus(e.target.value)}
        />
        <label>New Location: </label>
        <input
          type="text"
          value={editLocation}
          onChange={(e) => setEditLocation(e.target.value)}
        />
        <button onClick={editBook}>Edit Book</button>
      </div>

      {/* Delete Book by ID */}
      <div>
        <label>Book ID to Delete: </label>
        <input
          type="text"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        />
        <button onClick={deleteBook}>Delete Book</button>
      </div>

      {/* Add a New Book */}
      <div>
        <label>New Book Title: </label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label>Author: </label>
        <input
          type="text"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <label>ISBN: </label>
        <input
          type="text"
          value={newIsbn}
          onChange={(e) => setNewIsbn(e.target.value)}
        />
        <label>Category: </label>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <label>Published Date: </label>
        <input
          type="text"
          value={newPublishedDate}
          onChange={(e) => setNewPublishedDate(e.target.value)}
        />
        <label>Status: </label>
        <input
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        />
        <label>Location: </label>
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button onClick={addBook}>Add Book</button>
      </div>

      {/* Display the list of books */}
      <div>
        {books.length === 0 ? (
          <p>No books available</p>
        ) : (
          <ul>
            {books.map((book) => (
              <li key={book._id}>
                {book.title} - {book.author} - {book.isbn} - {book.category} - {book.publishedDate} - {book.status} - {book.location}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageBook;






