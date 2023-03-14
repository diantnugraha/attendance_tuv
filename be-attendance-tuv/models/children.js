const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('children', {
    child_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    child_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    child_gender: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    child_dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    child_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    child_nik: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'children',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "child_id" },
        ]
      },
    ]
  });
};
