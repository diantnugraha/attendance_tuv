const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('departments', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: "departments_name_unique"
    },
    obs_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'obs',
        key: 'id'
      }
    },
    division_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    code: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: "departments_code_unique"
    },
    category: {
      type: DataTypes.ENUM('Non Profit Center','Profit Center'),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'departments',
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
        name: "departments_name_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "departments_code_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "departments_obs_id_index",
        using: "BTREE",
        fields: [
          { name: "obs_id" },
        ]
      },
    ]
  });
};
