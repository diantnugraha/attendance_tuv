const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpi_appraisal_approvals', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    action: {
      type: DataTypes.ENUM('Accept','Approve','Dispute'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'kpi_appraisal_approvals',
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
      {
        name: "kpi_appraisal_approvals_employee_id_index",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
      {
        name: "kpi_appraisal_approvals_year_index",
        using: "BTREE",
        fields: [
          { name: "year" },
        ]
      },
    ]
  });
};
