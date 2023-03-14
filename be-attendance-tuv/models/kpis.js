const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpis', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(255),
      allowNull: false,
      unique: "kpis_name_unique"
    },
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id'
      }
    },
    job_title_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'job_titles',
        key: 'id'
      }
    },
    is_general: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    is_primary: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    composition: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    primary_composition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    active_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kpis',
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
        name: "kpis_name_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "kpis_department_id_index",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
      {
        name: "kpis_job_title_id_index",
        using: "BTREE",
        fields: [
          { name: "job_title_id" },
        ]
      },
    ]
  });
};
