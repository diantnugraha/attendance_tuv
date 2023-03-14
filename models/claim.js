const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('claim', {
    claim_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    claim_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    claim_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    claim_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    claim_value: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    claim_document: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    claim_apvsuperior: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    claim_apvhrd: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    claim_tfdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    claim_tfdocument: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    claim_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    claim_status: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    claim_reject: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'claim',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "claim_id" },
        ]
      },
    ]
  });
};
