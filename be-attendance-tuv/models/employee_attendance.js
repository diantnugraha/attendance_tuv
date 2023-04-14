const Sequelize = require("sequelize");
const moment = require("moment");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "employee_attendance",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      employee_imei: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      attendance_status: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      attendance_date: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      attendance_time_in: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      attendance_time_out: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      employee_latitude: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      employee_longitude: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      employee_latitude_out: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      employee_longitude_out: {
        type: DataTypes.CHAR(100),
        allowNull: false,
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "employee_attendance",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "employee_attendance_user_id_foreign",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
