class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createError = (msg, statusCode) => {
  return new CustomError(msg, statusCode);
};

module.exports = { createError, CustomError };
