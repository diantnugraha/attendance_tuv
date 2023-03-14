const { verifyToken } = require("../helpers/jwt");
const models = require("../models/index");

async function authenticationUser(request, respone, next) {
  try {
    let access_token = request.headers.access_token;

    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    let payload = verifyToken(access_token);
    let user = await models.users.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    request.user = {
      id: user.id,
      email: user.email,
      IMEI: user.IMEI,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = { authenticationUser };
