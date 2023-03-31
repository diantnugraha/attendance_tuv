const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fin_payable', {
    payable_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    payable_invoice: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    payable_po: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'fin_supplier',
        key: 'supplier_id'
      }
    },
    payable_invoicedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    payable_duedate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    payable_amount: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    payable_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    payable_operation: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    payable_category: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    payable_payment: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    payablet_risk: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    payable_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'fin_payable',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "payable_id" },
        ]
      },
      {
        name: "supplier to payable_idx",
        using: "BTREE",
        fields: [
          { name: "supplier_id" },
        ]
      },
    ]
  });
};
