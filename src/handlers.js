const books = require("./books");
const { nanoid } = require("nanoid");

const createBookHandler = (request, h) => {
  const bodyData = request.payload;

  if (!bodyData.name) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (bodyData.readPage > bodyData.pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const dateTime = new Date().toISOString();

  const newBook = {
    ...bodyData,
    id: nanoid(16),
    finished: bodyData.readPage === bodyData.pageCount ? true : false,
    insertedAt: dateTime,
    updatedAt: dateTime,
  };

  books.push(newBook);

  const isSuccess = books.some((book) => book.id === newBook.id);

  if (isSuccess) {
    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: newBook.id,
        },
      })
      .code(201);
  } else {
    return h
      .response({
        status: "fail",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
  }
};

const getAllBooksHandler = (request, h) => {
  const queries = request.query;
  let tempBooks = books;

  if (queries) {
    if (queries.name) {
      tempBooks = tempBooks.filter((book) =>
        book.name.toLowerCase().includes(queries.name.toLowerCase())
      );
    }

    if (queries.reading) {
      tempBooks = tempBooks.filter(
        (book) => book.reading === (queries.reading === "1" ? true : false)
      );
    }

    if (queries.finished) {
      tempBooks = tempBooks.filter(
        (book) => book.finished === (queries.finished === "1" ? true : false)
      );
    }
  }

  return h
    .response({
      status: "success",
      data: {
        books: tempBooks.map((book) => {
          return {
            id: book.id,
            name: book.name,
            publisher: book.publisher,
          };
        }),
      },
    })
    .code(200);
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const tempBooks = books.find((book) => book.id === bookId);

  if (tempBooks) {
    return h
      .response({
        status: "success",
        data: {
          book: tempBooks,
        },
      })
      .code(200);
  } else {
    return h
      .response({
        status: "fail",
        message: "Buku tidak ditemukan",
      })
      .code(404);
  }
};

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const bodyData = request.payload;

  if (!bodyData.name) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Mohon isi nama buku",
      })
      .code(400);
  }

  if (bodyData.readPage > bodyData.pageCount) {
    return h
      .response({
        status: "fail",
        message:
          "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      })
      .code(400);
  }

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
      })
      .code(404);
  } else {
    const updatedBook = {
      ...bodyData,
      finished: bodyData.readPage === bodyData.pageCount ? true : false,
      updatedAt: new Date().toISOString(),
    };

    books[bookIndex] = Object.assign(books[bookIndex], updatedBook);

    return h
      .response({
        status: "success",
        message: "Buku berhasil diperbarui",
      })
      .code(200);
  }
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const bookIndex = books.findIndex((book) => book.id === bookId);

  if (bookIndex === -1) {
    return h
      .response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  } else {
    books.splice(bookIndex, 1);
    return h
      .response({
        status: "success",
        message: "Buku berhasil dihapus",
      })
      .code(200);
  }
};

module.exports = {
  createBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
