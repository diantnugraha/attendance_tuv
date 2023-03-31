const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('education', {
    education_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    education_name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    education_title: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    education_major: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    education_level: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    education_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'education',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "education_id" },
        ]
      },
    ]
  });
};
