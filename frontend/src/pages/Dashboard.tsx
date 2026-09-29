import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  publishedYear: number | null;
  status: "Available" | "Issued";
}

function Dashboard() {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isbn, setIsbn] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [status, setStatus] =
    useState<"Available" | "Issued">("Available");

  // GET ALL BOOKS
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/books",
        config
      );

      setBooks(response.data);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load books"
      );
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ADD BOOK
  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/books",
        {
          title,
          author,
          category,
          isbn,
          publishedYear: publishedYear
            ? Number(publishedYear)
            : null,
          status,
        },
        config
      );

      setMessage("Book added successfully!");

      setTitle("");
      setAuthor("");
      setCategory("");
      setIsbn("");
      setPublishedYear("");
      setStatus("Available");

      fetchBooks();
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Failed to add book"
      );
    }
  };

  // UPDATE BOOK
  const handleUpdate = async (id: string) => {
    try {
      await axios.put(
        `http://localhost:5000/api/books/${id}`,
        {
          title,
          author,
          category,
          isbn,
          publishedYear: publishedYear
            ? Number(publishedYear)
            : null,
          status,
        },
        config
      );

      setMessage("Book updated successfully!");

      setEditingId(null);
      setTitle("");
      setAuthor("");
      setCategory("");
      setIsbn("");
      setPublishedYear("");
      setStatus("Available");

      fetchBooks();
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update book"
      );
    }
  };

  // DELETE BOOK
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/books/${id}`,
        config
      );

      setMessage("Book deleted successfully!");

      fetchBooks();
    } catch (error: any) {
      setMessage(
        error.response?.data?.message ||
          "Failed to delete book"
      );
    }
  };

  // SEARCH BOOKS
  const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    return (
      book.title.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.category.toLowerCase().includes(searchText)
    );
  });

  return (
    <div className="dashboard">

      {/* HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>📚 Library Dashboard</h1>
          <p>Manage your library books</p>
        </div>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </header>

      {/* MESSAGE */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}

      {/* ADD / EDIT BOOK */}
      <section className="add-book-section">
        <h2>
          {editingId ? "Edit Book" : "Add New Book"}
        </h2>

        <form
          className="book-form"
          onSubmit={(e) => {
            e.preventDefault();

            if (editingId) {
              handleUpdate(editingId);
            } else {
              handleAddBook(e);
            }
          }}
        >
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) =>
              setIsbn(e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) =>
              setPublishedYear(e.target.value)
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "Available"
                  | "Issued"
              )
            }
          >
            <option value="Available">
              Available
            </option>

            <option value="Issued">
              Issued
            </option>
          </select>

          <button type="submit">
            {editingId
              ? "Update Book"
              : "+ Add Book"}
          </button>
        </form>
      </section>

      {/* BOOK LIST */}
      <section className="books-section">

        <div className="books-heading">
          <h2>Books in Library</h2>

          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search books..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <div className="books-grid">

          {filteredBooks.length === 0 ? (
            <p>No books found.</p>
          ) : (
            filteredBooks.map((book) => (

              <div
                className="book-card"
                key={book._id}
              >

                <div className="book-cover">
                  📖
                </div>

                <div className="book-info">

                  <h3>{book.title}</h3>

                  <p>
                    <strong>Author:</strong>{" "}
                    {book.author}
                  </p>

                  <p>
                    <strong>Category:</strong>{" "}
                    {book.category || "General"}
                  </p>

                  {book.isbn && (
                    <p>
                      <strong>ISBN:</strong>{" "}
                      {book.isbn}
                    </p>
                  )}

                  {book.publishedYear && (
                    <p>
                      <strong>Year:</strong>{" "}
                      {book.publishedYear}
                    </p>
                  )}

                  <span
                    className={
                      book.status === "Available"
                        ? "available"
                        : "issued"
                    }
                  >
                    {book.status}
                  </span>

                  {/* EDIT */}
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setEditingId(book._id);
                      setTitle(book.title);
                      setAuthor(book.author);
                      setCategory(book.category);
                      setIsbn(book.isbn);

                      setPublishedYear(
                        book.publishedYear
                          ? String(
                              book.publishedYear
                            )
                          : ""
                      );

                      setStatus(book.status);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(book._id)
                    }
                  >
                    Delete
                  </button>

                </div>
              </div>
            ))
          )}

        </div>
      </section>

    </div>
  );
}

export default Dashboard;