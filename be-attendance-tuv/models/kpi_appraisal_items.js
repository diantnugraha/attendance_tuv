const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('kpi_appraisal_items', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    kpi_appraisal_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpi_appraisals',
        key: 'id'
      }
    },
    kpi_parameter_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: 'kpi_parameters',
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
    achievement: {
      type: DataTypes.DECIMAL(14,2),
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'kpi_appraisal_items',
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
        name: "kpi_appraisal_items_kpi_appraisal_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_appraisal_id" },
        ]
      },
      {
        name: "kpi_appraisal_items_kpi_parameter_id_index",
        using: "BTREE",
        fields: [
          { name: "kpi_parameter_id" },
        ]
      },
      {
        name: "kpi_appraisal_items_appraiser_id_index",
        using: "BTREE",
        fields: [
          { name: "appraiser_id" },
        ]
      },
    ]
  });
};
