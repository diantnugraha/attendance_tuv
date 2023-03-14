const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mother', {
    mother_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mother_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    mother_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    mother_approve: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'mother',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "mother_id" },
        ]
      },
    ]
  });
};
