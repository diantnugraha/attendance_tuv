const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('leave_permit', {
    leave_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee_list',
        key: 'employee_id'
      }
    },
    leave_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    leave_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    leave_duration: {
      type: DataTypes.DECIMAL(3,1),
      allowNull: true
    },
    leave_type_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    leave_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    leave_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    leave_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    leave_approve_sp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    leave_approve_hr: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    superior_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    leave_document: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    leave_reason_spv: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'leave_permit',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "leave_id" },
        ]
      },
      {
        name: "employee to permit_idx",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
