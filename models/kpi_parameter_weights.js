const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpi_parameter_weights', {
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
    kpi_parameter_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpi_parameters',
        key: 'id'
      }
    },
    weight: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'kpi_parameter_weights',
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
        name: "kpi_parameter_weights_kpi_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_id" },
        ]
      },
      {
        name: "kpi_parameter_weights_kpi_parameter_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_parameter_id" },
        ]
      },
    ]
  });
};
