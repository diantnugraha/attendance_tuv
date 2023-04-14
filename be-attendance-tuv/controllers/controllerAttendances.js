const date = require("date-and-time");
const moment = require('moment');
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

      console.log(currentTime, "ini dari IIIIIIIIINNNNn");

      const formatDate = date.format(now, "YYYY-MM-DD");

      const attendance_date = formatDate;

      const user_id = req.user.id;
      const attendance_time_in = currentTime;
      const attendance_status = "in";
      const attendance_time_out = "";
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
          employee_latitude,
          employee_longitude,
          employee_latitude_out,
          employee_longitude_out,
          user_id,
        });
        res.status(201).json({ message: "Thank you for Check-In !" });
      }
      // let detailCurrentAttendance =
      //   await models.employee_attendance.findAndCountAll({
      //     where: {
      //       attendance_date: formatDate,
      //       user_id: user_id,
      //     },
      //   });

      // if (detailCurrentAttendance.count === 0) {
      //   let addUser = await models.employee_attendance.create({
      //     employee_imei,
      //     attendance_date,
      //     attendance_status,
      //     attendance_time_in,
      //     attendance_time_out,
      //     employee_latitude,
      //     employee_longitude,
      //     employee_latitude_out,
      //     employee_longitude_out,
      //     user_id,
      //   });
      //   res.status(201).json({ message: "Thank you for Check-In !" });
      // } else if (detailCurrentAttendance.count === 1) {
      //   throw { name: "status_check-in" };
      // }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async logAttendance(req, res, next) {
    console.log('cek');
    try {
      const id = req.user.id
      let logAttendances = await models.employee_attendance.findAll({
        where : {
          user_id : id
        }
      })
      res.status(200).json(logAttendances)
    } catch (error) {
      console.log(error);
      next(error)
    }
  }

  static async currentAttendance(req, res, next) {
    try {
      const now = new Date();
      const currentDate = date.format(now, "YYYY-MM-DD");
      const id = req.user.id;
      console.log(id, "ini dari current");
      let detailCurrentAttendance = await models.employee_attendance.findOne({
        where: {
          attendance_date: currentDate,
          user_id: id,
        },
      });

      const timeIn = detailCurrentAttendance.attendance_time_in

      const timeOut = detailCurrentAttendance.attendance_time_out
      
  

      // const duration = moment.duration(moment().diff(moment(timeIn, 'HH:mm:ss')));
      // const hours = duration.asHours();
      // const workHours = hours - 1

      // res.status(200).json(workHours);

      if (!detailCurrentAttendance) {
        throw { name: "DATA_NOT_FOUND" };
      }
      if (!timeOut) {
        const duration = moment.duration(moment().diff(moment(timeIn, 'HH:mm:ss')));
        const hours = duration.asHours();
        const workHours = hours - 1
        console.log(workHours, 'ini dari current');
        // res.status(200).json(workHours);
        }

        if (timeOut) {
          const duration = moment.duration(moment(timeOut, 'HH:mm:ss').diff(moment(timeIn, 'HH:mm:ss')));
          const hours = duration.asHours();
          const workHours = hours - 1
          console.log(workHours, 'ini dari cekout');
          // res.status(200).json(workHours);
          }


      console.log(detailCurrentAttendance, "ini dari detail");

      res.status(200).json(detailCurrentAttendance);
       
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async userCheckOut(req, res, next) {
    try {
      const currentDate = new Date();
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
      res.status(200).json({ message: "Thank you for Check-Out !" });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = Controller;
