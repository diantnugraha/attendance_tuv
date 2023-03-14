const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_request', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    job_title_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    general_job_purpose: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    job_description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    job_requirement: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status_employee_request: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status_recruitment: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'employee_request',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
