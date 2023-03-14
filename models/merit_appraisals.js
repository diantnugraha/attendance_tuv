const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('merit_appraisals', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    merit_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'merits',
        key: 'id'
      }
    },
    appraiser_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    year: {
      type: DataTypes.DATE,
      allowNull: false
    },
    achievement: {
      type: DataTypes.DOUBLE(8,2),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'employee_list',
        key: 'employee_id'
      }
    }
  }, {
    sequelize,
    tableName: 'merit_appraisals',
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
        name: "merit_appraisals_merit_id_index",
        using: "BTREE",
        fields: [
          { name: "merit_id" },
        ]
      },
      {
        name: "merit_appraisals_appraiser_id_index",
        using: "BTREE",
        fields: [
          { name: "appraiser_id" },
        ]
      },
      {
        name: "merit_appraisals_employee_id_index",
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
    ]
  });
};
