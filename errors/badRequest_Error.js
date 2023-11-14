const { StatusCodes } = require("http-status-codes");
const CustomApiError = require("./custom_Api");

class BadRequestErrors extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestErrors;
