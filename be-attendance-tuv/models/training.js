const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('training', {
    training_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    training_year: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    training_topic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    training_document: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    training_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    training_provider: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'training',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "training_id" },
        ]
      },
    ]
  });
};
