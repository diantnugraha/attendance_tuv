const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('document_monitors', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('Permit','Insurance','Certificate'),
      allowNull: false
    },
    institution: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    institution_area: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    number: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    publish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    process_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    department_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'departments',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'document_monitors',
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
        name: "document_monitors_user_id_index",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "document_monitors_department_id_index",
        using: "BTREE",
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
};
