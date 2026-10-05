const express = require("express");

const app = express();

app.use(express.json());

// Sample books
let books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho"
  },
  {
    id: 2,
    title: "Wings of Fire",
    author: "A.P.J. Abdul Kalam"
  }
];

// GET - Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET - Get one book
app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
});

// POST - Add a new book
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// PUT - Update a book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = req.body.title;
  book.author = req.body.author;

  res.json(book);
});

// DELETE - Delete a book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deletedBook = books.splice(index, 1);

  res.json({
    message: "Book deleted successfully",
    book: deletedBook[0]
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
