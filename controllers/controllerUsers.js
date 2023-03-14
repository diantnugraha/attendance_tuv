const { comparePassword } = require("../helpers/bcrypt");
const { createToken, decodeToken } = require("../helpers/jwt");
const models = require("../models/index");

class Controller {
  static async registerUser(req, res, next) {
    try {
      let { email, password, IMEI } = req.body;
      let addUser = await User.create({
        email,
        password,
        IMEI,
      });
      let objAddUser = {
        id: addUser.id,
        email: addUser.email,
        IMEI: addUser.IMEI,
      };
      res.status(201).json(objAddUser);
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(req, res, next) {
    try {
      let { email, password, user_imei } = req.body;
      let findUser = await models.users.findOne({
        where: {
          email: email,
        },
      });

      // if (!findUser.user_imei) {
      //   let addIMEI = await models.users.create({
      //     user_imei,
      //   });
      //   console.log(addIMEI, "success add imei");
      // }

      if (findUser.user_imei !== user_imei) {
        throw { name: "invalid_imei" };
      }

      if (!findUser) {
        throw { name: "invalid_credentials" };
      }

      const comparedPassword = comparePassword(password, findUser.password);

      if (!comparedPassword) {
        throw { name: "invalid_credentials" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
        IMEI: findUser.user_imei,
      };

      const access_token = createToken(payload);
      res.status(200).json({ payload, access_token });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async getAllData(req, res, next) {
    try {
      let user = await models.users.findAll();
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //   static async profileUser(req, res, next) {
  //     try {
  //       let { access_token } = req.headers;
  //       if (!access_token) {
  //         throw { name: "invalid_token" };
  //       }
  //       let profile = decodeToken(access_token);
  //       res.status(201).json(profile);
  //     } catch (error) {
  //       next(error);
  //     }
  //   }
}

module.exports = Controller;
