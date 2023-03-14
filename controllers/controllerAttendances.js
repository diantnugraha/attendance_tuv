const date = require("date-and-time");

const models = require("../models/index");

class Controller {
  static async userCheckIn(req, res, next) {
    try {
      let {
        employee_imei,
        attendance_time_in,
        employee_latitude,
        employee_longtitude,
      } = req.body;

      const now = new Date();
      const formatDate = date.format(now, "YYYY-MM-DD HH:mm:ss");

      const attendance_date = formatDate;

      const user_id = req.user.id;
      const attendance_status = "in";
      const attendance_time_out = "null";
      const employee_longtitude_out = "null";
      const employee_latitude_out = "null";

      let addUser = await models.employee_attendance.create({
        employee_imei,
        attendance_date,
        attendance_status,
        attendance_time_in,
        attendance_time_out,
        employee_latitude,
        employee_longtitude,
        employee_latitude_out,
        employee_longtitude_out,
        user_id,
      });
      res.status(201).json(addUser);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async userCheckOut(req, res, next) {
    try {
      let {
        attendance_time_out,
        employee_latitude_out,
        employee_longtitude_out,
      } = req.body;
      let { id } = req.params;

      let updateTime = await models.employee_attendance.update(
        {
          attendance_time_out,
          employee_latitude_out,
          employee_longtitude_out,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(201).json(updateTime);
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
