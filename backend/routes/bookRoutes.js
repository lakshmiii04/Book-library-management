const express = require("express");

const Book = require("../models/Book");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// All book routes require login
router.use(authMiddleware);

// GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch books",
      error: error.message,
    });
  }
});

// GET SINGLE BOOK
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch book",
      error: error.message,
    });
  }
});

// ADD BOOK
router.post("/", async (req, res) => {
  try {
    const {
      title,
      author,
      category,
      isbn,
      publishedYear,
      status,
    } = req.body;

    if (!title || !author) {
      return res.status(400).json({
        message: "Title and author are required",
      });
    }

    const book = new Book({
      title,
      author,
      category,
      isbn,
      publishedYear,
      status,
    });

    const savedBook = await book.save();

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add book",
      error: error.message,
    });
  }
});

// UPDATE BOOK
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
});

// DELETE BOOK
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(
      req.params.id
    );

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete book",
      error: error.message,
    });
  }
});

module.exports = router;