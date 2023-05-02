const { comparePassword } = require("../helpers/bcrypt");
const { createToken, decodeToken } = require("../helpers/jwt");
const models = require("../models/index");

class Controller {
  static async registerUser(req, res, next) {
    try {
      let { email, password } = req.body;
      let addUser = await User.create({
        email,
        password,
      });
      let objAddUser = {
        id: addUser.id,
        email: addUser.email,
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

      if (!findUser) {
        throw { name: "invalid_credentials" };
      }


      if (findUser.user_imei == "" || findUser.user_imei === null) {
        let addIMEI = await models.users.update(
          {
            user_imei: user_imei,
          },
          { where: { email: email } }
        );
      } else {
        if (findUser.user_imei !== user_imei) {
          throw { name: "invalid_imei" };
        }
      }

      // if (!findUser) {
      //   throw { name: "invalid_credentials" };
      // }

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
      console.log(error);
      next(error);
    }
  }

  static async getAllData(req, res, next) {
    try {
      let user = await models.users.findAll();
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getDetailUsers(req, res, next) {
    let { id } = req.params;
    try {
      let detailUser = await models.users.findOne({
        where: {
          id: id,
        },
      });

      let employee_id = detailUser.employee_id;

      let detailEmployee = await models.employee_list.findOne({
        where: {
          employee_id: employee_id,
        },
      });

      let jobTitleID = detailEmployee.job_title_id;

      let jobTitle = await models.job_titles.findOne({
        where: {
          id: jobTitleID,
        },
      });
      res.status(200).json({ detailEmployee, jobTitle });
    } catch (error) {
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
