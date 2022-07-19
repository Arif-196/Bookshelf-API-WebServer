const { nanoid } = require("nanoid");

const books = require("./books");

// INSERT BOOK
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const sendResponse = h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku !. Harap Masuykan nama terlebih dahulu",
      })
      .code(400);
    return sendResponse;
  }

  if (readPage > pageCount) {
    const sendResponse = h
      .response({
        status: "fail",
        message: "Read Page tidak boleh lebih besar dari Page Count",
      })
      .code(400);
    return sendResponse;
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    createdAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((note) => note.id).length > 0;

  if (isSuccess) {
    const sendResponse = h
      .response({
        status: "sucess",
        message: "Success Adding a Book",
        data: {
          bookId: id,
        },
      })
      .code(201);
    return sendResponse;
  }

  const sendResponse = h
    .response({
      status: "fail",
      message: "Failed add the Book",
    })
    .code(500);

  return sendResponse;
};

const listAllBookHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (!name && !reading && !finished) {
    const sendResponse = h
      .response({
        status: "succes",
        data: {
          books: books.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return sendResponse;
  }

  if (name) {
    const filteredBookName = books.filter((book) => {
      const nameRegex = new RegExp(name, "gi");
      return nameRegex.test(book.name);
    });

    const sendResponse = h
      .response({
        status: "success",
        data: {
          books: filteredBookName.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return sendResponse;
  }

  if (reading) {
    // kalau ada query reading
    const filteredBookReading = books.filter(
      (book) => Number(book.reading) === Number(reading)
    );

    const sendResponse = h
      .response({
        status: "success",
        data: {
          books: filteredBookReading.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          })),
        },
      })
      .code(200);

    return sendResponse;
  }
  const filteredBookFinished = books.filter(
    (book) => Number(book.finished) === Number(finished)
  );

  const sendResponse = h
    .response({
      status: "success",
      data: {
        books: filteredBookFinished.map((book) => ({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
        })),
      },
    })
    .code(200);

  return sendResponse;
};

const getBookById = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((n) => n.id === bookId)[0];

  if (book) {
    const sendResponse = h
      .response({
        status: "success",
        data: {
          book,
        },
      })
      .code(200);
    return sendResponse;
  }

  const sendResponse = h
    .response({
      status: "fail",
      message: "Buku tidak ditemukan",
    })
    .code(404);
  return sendResponse;
};

const updateBookHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const sendResponse = h
      .response({
        status: "fail",
        message: "Failed Updated, Please add Book Name",
      })
      .code(400);
    return sendResponse;
  }

  if (readPage > pageCount) {
    const sendResponse = h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
    return sendResponse;
  }

  const finished = pageCount === readPage;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const sendResponse = h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
    return sendResponse;
  }

  const sendResponse = h
    .response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    })
    .code(404);
  return sendResponse;
};

const deleteBookHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((note) => note.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);

    const sendResponse = h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
    return sendResponse;
  }

  const sendResponse = h
    .response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    })
    .code(404);
  return sendResponse;
};

module.exports = {
  addBookHandler,
  listAllBookHandler,
  getBookById,
  updateBookHandler,
  deleteBookHandler,
};
