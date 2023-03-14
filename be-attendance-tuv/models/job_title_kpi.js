const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_title_kpi', {
    job_title_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'job_titles',
        key: 'id'
      }
    },
    kpi_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpis',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'job_title_kpi',
    timestamps: false,
    indexes: [
      {
        name: "job_title_kpi_job_title_id_index",
        using: "BTREE",
        fields: [
          { name: "job_title_id" },
        ]
      },
      {
        name: "job_title_kpi_kpi_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_id" },
        ]
      },
    ]
  });
};
