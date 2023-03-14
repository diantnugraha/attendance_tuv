const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('job_titles', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    job_level_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'job_levels',
        key: 'id'
      }
    },
    direct_report_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    division_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    purpose: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    requirement: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('Administration','Technical'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'job_titles',
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
        name: "job_titles_job_level_id_index",
        using: "BTREE",
        fields: [
          { name: "job_level_id" },
        ]
      },
      {
        name: "job_titles_direct_report_id_index",
        using: "BTREE",
        fields: [
          { name: "direct_report_id" },
        ]
      },
    ]
  });
};
