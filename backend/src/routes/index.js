const { randomUUID: uuid } = require("crypto");
const { Router } = require("express");

const router = Router();

const books = [];

// List all books
router.get("/books", async (request, response) => {
  return response.json(books);
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
router.get("/books/:id", async (request, response) => {});
// Update book
router.put("/books/:id", async (request, response) => {});
// Delete book
router.delete("/books/:id", async (request, response) => {});

module.exports = { router };
