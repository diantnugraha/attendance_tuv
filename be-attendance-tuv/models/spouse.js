const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spouse', {
    spouse_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    spouse_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    spouse_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    spouse_approve: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'spouse',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "spouse_id" },
        ]
      },
    ]
  });
};
