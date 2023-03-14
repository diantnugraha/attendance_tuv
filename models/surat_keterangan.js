const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('surat_keterangan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approved_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: "surat_keterangan_code_unique"
    },
    alasan: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'surat_keterangan',
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
        name: "surat_keterangan_code_unique",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
    ]
  });
};
