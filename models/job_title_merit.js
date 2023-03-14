const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_title_merit', {
    job_title_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'job_titles',
        key: 'id'
      }
    },
    merit_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'merits',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'job_title_merit',
    timestamps: false,
    indexes: [
      {
        name: "job_title_merit_job_title_id_index",
        using: "BTREE",
        fields: [
          { name: "job_title_id" },
        ]
      },
      {
        name: "job_title_merit_merit_id_index",
        using: "BTREE",
        fields: [
          { name: "merit_id" },
        ]
      },
    ]
  });
};
