const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('inv_device', {
    device_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    device_inventory: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_type: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_merk: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_model: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_sn: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_idno: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_os: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    device_processor: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    device_memory: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    device_purchasedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    device_condition: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    device_note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    device_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'inv_device',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "device_id" },
        ]
      },
    ]
  });
};
