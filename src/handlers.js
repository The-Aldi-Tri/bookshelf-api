const { nanoid } = require("nanoid");
const Sequelize = require("sequelize");
const Books = require("./models/books");

const createBookHandler = async (request, h) => {
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

  try {
    const createdBook = await Books.create(newBook);

    return h
      .response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: createdBook.id,
        },
      })
      .code(201);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Buku gagal ditambahkan",
      })
      .code(500);
  }
};

const getAllBooksHandler = async (request, h) => {
  const queries = request.query;

  try {
    const options = {};

    if (queries) {
      if (queries.name) {
        options.where = {
          name: {
            [Sequelize.Op.iLike]: `%${queries.name}%`,
          },
        };
      }

      if (queries.reading) {
        options.where = {
          ...options.where,
          reading: queries.reading === "1" ? true : false,
        };
      }

      if (queries.finished) {
        options.where = {
          ...options.where,
          finished: queries.finished === "1" ? true : false,
        };
      }
    }

    const books = await Books.findAll(options);

    return h
      .response({
        status: "success",
        data: {
          books: books.map((book) => {
            return {
              id: book.id,
              name: book.name,
              publisher: book.publisher,
            };
          }),
        },
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const getBookByIdHandler = async (request, h) => {
  const { bookId } = request.params;

  try {
    const book = await Books.findByPk(bookId);

    if (book) {
      return h
        .response({
          status: "success",
          data: {
            book,
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
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const updateBookByIdHandler = async (request, h) => {
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

  try {
    const [updated] = await Books.update(
      {
        ...bodyData,
        finished: bodyData.readPage === bodyData.pageCount,
        updatedAt: new Date().toISOString(),
      },
      {
        where: {
          id: bookId,
        },
      }
    );

    if (updated) {
      return h
        .response({
          status: "success",
          message: "Buku berhasil diperbarui",
        })
        .code(200);
    } else {
      return h
        .response({
          status: "fail",
          message: "Gagal memperbarui buku. Id tidak ditemukan",
        })
        .code(404);
    }
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

const deleteBookByIdHandler = async (request, h) => {
  const { bookId } = request.params;

  try {
    const deleted = await Books.destroy({
      where: {
        id: bookId,
      },
    });

    if (deleted) {
      return h
        .response({
          status: "success",
          message: "Buku berhasil dihapus",
        })
        .code(200);
    } else {
      return h
        .response({
          status: "fail",
          message: "Buku gagal dihapus. Id tidak ditemukan",
        })
        .code(404);
    }
  } catch (error) {
    console.error(error);
    return h
      .response({
        status: "fail",
        message: "Terjadi kesalahan pada server",
      })
      .code(500);
  }
};

module.exports = {
  createBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
