const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merits', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    merit_factor_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'merit_factors',
        key: 'id'
      }
    },
    category: {
      type: DataTypes.ENUM('Merit','Demerit'),
      allowNull: false
    },
    target: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false
    },
    target_type: {
      type: DataTypes.ENUM('Min','Max'),
      allowNull: false
    },
    unit: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    weight: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'merits',
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
        name: "merits_merit_factor_id_index",
        using: "BTREE",
        fields: [
          { name: "merit_factor_id" },
        ]
      },
    ]
  });
};
