const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('announcement', {
    ann_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ann_title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    ann_text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ann_pict: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    ann_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'announcement',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ann_id" },
        ]
      },
    ]
  });
};
