const { randomUUID: uuid } = require("crypto");
const { Router } = require("express");

const router = Router();

const books = [];

// List all books
router.get("/books", async (request, response) => {
  return response.json({ books });
});
// Create book
router.post("/books", async (request, response) => {
  const { title, author, numberOfPages } = request.body;

  const book = {
    id: uuid(),
    title,
    author,
    numberOfPages,
  };

  books.push(book);

  return response.status(201).json();
});
// Get book
router.get("/books/:id", async (request, response) => {
  const { id } = request.params;

  const bookAlreadyExists = books.find((findBook) => findBook.id === id);

  if (!bookAlreadyExists)
    return response.status(400).json({ error: "Book does not exists." });

  return response.json(bookAlreadyExists);
});
// Update book
router.put("/books/:id", async (request, response) => {
  const { id } = request.params;
  const { title, author, numberOfPages } = request.body;

  const book = books.find((findBook) => findBook.id === id);
  console.log(book);

  if (!book)
    return response.status(400).json({ error: "Book does not exists." });

  book.title = title || book.title;
  book.author = author || book.author;
  book.numberOfPages = numberOfPages || book.numberOfPages;

  return response.json(book);
});
// Delete book
router.delete("/books/:id", async (request, response) => {
  const { id } = request.params;

  const bookIndex = books.findIndex((findBook) => findBook.id === id);

  if (bookIndex < 0)
    return response.status(400).json({ error: "Book does not exists." });

  books.splice(bookIndex, 1);

  return response.status(204).json();
});

module.exports = { router };
