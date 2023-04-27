const date = require("date-and-time");
const moment = require("moment");
const models = require("../models/index");

class Controller {
  static async userCheckIn(req, res, next) {
    try {
      let { employee_imei, employee_latitude, employee_longitude } = req.body;

      const now = new Date();

      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      const currentTime = hours + ":" + minutes + ":" + seconds;

      const formatDate = date.format(now, "YYYY-MM-DD");

      const attendance_date = formatDate;

      const user_id = req.user.id;
      const attendance_time_in = currentTime;
      const attendance_status = "in";
      const attendance_time_out = "";
      const total_hours = "";
      const employee_longitude_out = "null";
      const employee_latitude_out = "null";

      let existingCureentAttendance = await models.employee_attendance.findOne({
        where: {
          attendance_date: formatDate,
          user_id: user_id,
        },
      });

      if (existingCureentAttendance) {
        throw { name: "status_check-in" };
      }

      if (!existingCureentAttendance) {
        await models.employee_attendance.create({
          employee_imei,
          attendance_date,
          attendance_status,
          attendance_time_in,
          attendance_time_out,
          total_hours,
          employee_latitude,
          employee_longitude,
          employee_latitude_out,
          employee_longitude_out,
          user_id,
        });
        res.status(201).json({ message: "Thank you for Check-In !" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async userCheckOut(req, res, next) {
    try {
      const currentDate = new Date();
      const dateNow = date.format(currentDate, "YYYY-MM-DD");

      let hours = currentDate.getHours();
      let minutes = currentDate.getMinutes();
      let seconds = currentDate.getSeconds();

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      const currentTime = hours + ":" + minutes + ":" + seconds;

      let { employee_latitude_out, employee_longitude_out } = req.body;
      let { id } = req.params;
      const user_id = req.user.id;

      // Check if user has checked in
      const checkInRecord = await models.employee_attendance.findOne({
        where: {
          user_id: user_id,
          attendance_date: dateNow,
        },
      });

      const attendance_time_out = currentTime;
      let updateTime = await models.employee_attendance.update(
        {
          attendance_time_out,
          employee_latitude_out,
          employee_longitude_out,
        },
        {
          where: {
            id: id,
            user_id: user_id,
          },
        }
      );

      const duration = moment.duration(
        moment(attendance_time_out, "HH:mm:ss").diff(
          moment(checkInRecord.attendance_time_in, "HH:mm:ss")
        )
      );
      const totalHours = duration.asHours().toFixed(2);

      const total_hours = totalHours;

      let totalHoursWork = await models.employee_attendance.update(
        {
          total_hours,
        },
        {
          where: {
            id: id,
            user_id: user_id,
          },
        }
      );
      res.status(200).json({ message: "Thank you for Check-Out !" });
    } catch (error) {
      next(error);
    }
  }

  static async logAttendance(req, res, next) {
    try {
      const id = req.user.id;
      let logAttendances = await models.employee_attendance.findAll({
        where: {
          user_id: id,
        },
        order: [["created_at", "DESC"]],
      });
      res.status(200).json(logAttendances);
    } catch (error) {
      next(error);
    }
  }

  static async currentAttendance(req, res, next) {
    try {
      const now = new Date();
      const currentDate = date.format(now, "YYYY-MM-DD");
      const id = req.user.id;
      let detailCurrentAttendance = await models.employee_attendance.findOne({
        where: {
          attendance_date: currentDate,
          user_id: id,
        },
      });
      res.status(200).json(detailCurrentAttendance);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
