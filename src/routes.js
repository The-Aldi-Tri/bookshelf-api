const {
  createBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require("./handlers");

const bookRoutes = [
  { method: "POST", path: "/books", handler: createBookHandler },
  { method: "GET", path: "/books", handler: getAllBooksHandler },
  { method: "GET", path: "/books/{bookId}", handler: getBookByIdHandler },
  { method: "PUT", path: "/books/{bookId}", handler: updateBookByIdHandler },
  { method: "DELETE", path: "/books/{bookId}", handler: deleteBookByIdHandler },
];

module.exports = bookRoutes;
