const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpi_appraisals', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    kpi_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpis',
        key: 'id'
      }
    },
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    year: {
      type: DataTypes.DATE,
      allowNull: false
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_final: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee_list',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'kpi_appraisals',
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
        name: "kpi_appraisals_kpi_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_id" },
        ]
      },
      {
        name: "kpi_appraisals_department_id_index",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
      {
        name: "kpi_appraisals_employee_id_index",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
