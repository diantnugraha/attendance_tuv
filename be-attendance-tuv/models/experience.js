const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('experience', {
    exp_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    exp_periode_start: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    exp_job: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    exp_position: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    exp_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    exp_periode_end: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    exp_description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'experience',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "exp_id" },
        ]
      },
    ]
  });
};
