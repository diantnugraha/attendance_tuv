const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department_job_title', {
    job_title_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'job_titles',
        key: 'id'
      }
    },
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'departments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'department_job_title',
    timestamps: false,
    indexes: [
      {
        name: "department_job_title_job_title_id_index",
        using: "BTREE",
        fields: [
          { name: "job_title_id" },
        ]
      },
      {
        name: "department_job_title_department_id_index",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
};
