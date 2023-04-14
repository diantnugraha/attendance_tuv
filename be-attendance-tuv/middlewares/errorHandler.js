function errorHandle(error, request, respone, next) {
  let name = error.name;
  let code;
  let message;

  switch (name) {
    case "SequelizeValidationError":
      code = 400;
      message = error.errors.map((el) => {
        return el.message;
      });
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = error.errors.map((el) => {
        return el.message;
      });
      break;
    case "invalid_token":
      code = 401;
      message = "Invalid Token";
      break;
    case "invalid_credentials":
      code = 401;
      message = "Invalid email or password";
      break;
    case "Unauthorized":
      code = 401;
      message = "Do not have access, please login";
      break;
    case "JsonWebTokenError":
      code = 401;
      message = "Do not have access, please login";
      break;
    case "Forbidden access":
      code = 403;
      message = `Do not have access`;
      break;
    case "DATA_NOT_FOUND":
      code = 404;
      message = `Data not found`;
      break;
    case "status_check-in":
      code = 400;
      message = `Employee already check in today`;
      break;
    case "invalid_imei":
      code = 401;
      message = `Please login in your device already registered!`;
      break;
    default:
      (code = 500), (message = "Internal server error");
      break;
  }
  respone.status(code).json({ message });
}

module.exports = errorHandle;
