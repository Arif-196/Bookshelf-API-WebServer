const {
  addBookHandler,
  listAllBookHandler,
  getBookById,
  updateBookHandler,
  deleteBookHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: listAllBookHandler,
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: updateBookHandler,
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookHandler,
  },
  {
    method: "*",
    path: "/{any*}",
    handler: () => "Halaman tidak dapat ditemukan",
  },
];

module.exports = routes;
