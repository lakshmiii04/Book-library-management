const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
      trim: true,
    },

    isbn: {
      type: String,
      default: "",
      trim: true,
    },

    publishedYear: {
      type: Number,
      default: null,
    },

    status: {
      type: String,
      enum: ["Available", "Issued"],
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", bookSchema);