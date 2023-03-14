const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('origin_users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_fullname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    user_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_displayname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'role_access',
        key: 'role_id'
      }
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    superior_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    job_title_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'job_titles',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'origin_users',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "role to user_idx",
        using: "BTREE",
        fields: [
          { name: "role_id" },
        ]
      },
      {
        name: "users_job_title_id_index",
        using: "BTREE",
        fields: [
          { name: "job_title_id" },
        ]
      },
    ]
  });
};
