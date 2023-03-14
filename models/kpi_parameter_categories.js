const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpi_parameter_categories', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: "kpi_parameter_categories_name_unique"
    },
    parent_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kpi_parameter_categories',
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
        name: "kpi_parameter_categories_name_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "kpi_parameter_categories_parent_id_index",
        using: "BTREE",
        fields: [
          { name: "parent_id" },
        ]
      },
    ]
  });
};
