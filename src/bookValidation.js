const Joi = require("joi");

const createBookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Gagal menambahkan buku. Mohon isi nama buku",
    "any.required": "Gagal menambahkan buku. Mohon isi nama buku",
  }),
  year: Joi.number().integer().min(1).max(new Date().getFullYear()).required(),
  author: Joi.string().required(),
  summary: Joi.string().required(),
  publisher: Joi.string().required(),
  pageCount: Joi.number().integer().min(1).required(),
  readPage: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("pageCount"))
    .required()
    .messages({
      "number.max":
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    }),
  reading: Joi.boolean().required(),
});

const updateBookPayloadSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Gagal memperbarui buku. Mohon isi nama buku",
    "any.required": "Gagal memperbarui buku. Mohon isi nama buku",
  }),
  year: Joi.number().integer().min(1).max(new Date().getFullYear()),
  author: Joi.string(),
  summary: Joi.string(),
  publisher: Joi.string(),
  pageCount: Joi.number().integer().min(1),
  readPage: Joi.number()
    .integer()
    .min(0)
    .max(Joi.ref("pageCount"))
    .required()
    .messages({
      "number.max":
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    }),
  reading: Joi.boolean(),
});

const bookIdParamsSchema = Joi.string();

const getBookQuerySchema = Joi.object({
  name: Joi.string(),
  reading: Joi.alternatives().try(
    Joi.string().valid("0", "1"),
    Joi.number().valid(0, 1),
    Joi.boolean()
  ),
  finished: Joi.alternatives().try(
    Joi.string().valid("0", "1"),
    Joi.number().valid(0, 1),
    Joi.boolean()
  ),
});

const validateBook = (schema, data) => {
  return schema.validate(data);
  //   if (validationResult.error) {
  //     return {
  //       isValid: false,
  //       errorMessage: validationResult.error.details[0].message,
  //     };
  //   }

  //   return {
  //     isValid: true,
  //   };
};

module.exports = {
  createBookPayloadSchema,
  updateBookPayloadSchema,
  bookIdParamsSchema,
  getBookQuerySchema,
  validateBook,
};
