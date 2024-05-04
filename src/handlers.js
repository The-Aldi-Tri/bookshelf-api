const { nanoid } = require("nanoid");
const Sequelize = require("sequelize");
const Book = require("./models/book");
const {
  createBookPayloadSchema,
  updateBookPayloadSchema,
  bookIdParamsSchema,
  getBookQuerySchema,
  validateBook,
} = require("./bookValidation");

const createBookHandler = async (request, h) => {
  const bodyData = request.payload;

  const { error } = await validateBook(createBookPayloadSchema, bodyData);
  if (error) {
    return h
      .response({
        status: "fail",
        message: error.details[0].message,
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
    const createdBook = await Book.create(newBook);

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

  const { error } = await validateBook(getBookQuerySchema, queries);
  if (error) {
    return h
      .response({
        status: "fail",
        message: error.details[0].message,
      })
      .code(400);
  }

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

    const filteredBooks = await Book.findAll(options);

    return h
      .response({
        status: "success",
        data: {
          books: filteredBooks.map((book) => {
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

  const { error } = await validateBook(bookIdParamsSchema, bookId);
  if (error) {
    return h
      .response({
        status: "fail",
        message: error.details[0].message,
      })
      .code(400);
  }

  try {
    const book = await Book.findByPk(bookId);

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

  const errorParams = await validateBook(bookIdParamsSchema, bookId).error;
  if (errorParams) {
    return h
      .response({
        status: "fail",
        message: errorParams.details[0].message,
      })
      .code(400);
  }

  const errorPayload = await validateBook(updateBookPayloadSchema, bodyData)
    .error;
  if (errorPayload) {
    return h
      .response({
        status: "fail",
        message: errorPayload.details[0].message,
      })
      .code(400);
  }

  try {
    const [updated] = await Book.update(
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

  const { error } = await validateBook(bookIdParamsSchema, bookId);
  if (error) {
    return h
      .response({
        status: "fail",
        message: error.details[0].message,
      })
      .code(400);
  }

  try {
    const deleted = await Book.destroy({
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
