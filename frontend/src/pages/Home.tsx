import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          📚 LibraryHub
        </div>

        <div className="nav-links">
          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="welcome">
            WELCOME TO LIBRARYHUB
          </p>

          <h1>
            Manage Your
            <br />
            <span>Library Easily.</span>
          </h1>

          <p className="description">
            A simple and modern library management system
            to organize, search, add, edit and manage your
            books efficiently.
          </p>

          <div className="buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </button>
          </div>
        </div>

        <div className="hero-book">
          <div className="book-icon">
            📚
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">
            📖
          </div>

          <h2>Manage Books</h2>

          <p>
            Add, edit and delete books from your
            library easily.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            🔍
          </div>

          <h2>Search Books</h2>

          <p>
            Quickly find books by title, author or
            category.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">
            🔐
          </div>

          <h2>Secure Login</h2>

          <p>
            Access your library through a secure user
            account.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;