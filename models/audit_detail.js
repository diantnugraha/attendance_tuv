const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit_detail', {
    audit_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    log_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    audit_description: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    audit_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'audit_detail',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "audit_id" },
        ]
      },
    ]
  });
};
