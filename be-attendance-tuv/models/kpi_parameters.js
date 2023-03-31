const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpi_parameters', {
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
    kpi_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpis',
        key: 'id'
      }
    },
    kpi_parameter_category_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpi_parameter_categories',
        key: 'id'
      }
    },
    job_title_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    target: {
      type: DataTypes.DECIMAL(14,2),
      allowNull: false
    },
    unit: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    default_weight: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: true
    },
    target_type: {
      type: DataTypes.ENUM('Min','Max'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'kpi_parameters',
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
        name: "kpi_parameters_kpi_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_id" },
        ]
      },
      {
        name: "kpi_parameters_kpi_parameter_category_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_parameter_category_id" },
        ]
      },
    ]
  });
};
