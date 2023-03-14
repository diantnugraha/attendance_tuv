const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('employee_list', {
    employee_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uuid: {
      type: DataTypes.CHAR(36),
      allowNull: false
    },
    employee_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    employee_status: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    employee_joindate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_permanentdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_location: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_trash: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_contact: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    employee_bu: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    employee_ext: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_gender: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_nickname: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_images: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_contractdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_probationdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_mother: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_father: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_spouse: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_maritalstatus: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_reason: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_exitdate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_emg_name: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_emg_rel: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_emg_phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_nik: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_alamat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    employee_kk_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_kk: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_ktp_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_ktp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_npwp_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_npwp: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_allianz_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_allianz: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_bpjs_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_bpjs: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_bpjstk_file: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    employee_bpjstk: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    employee_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    job_title_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'job_titles',
        key: 'id'
      }
    },
    other_department_id: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    fte: {
      type: DataTypes.STRING(225),
      allowNull: true
    },
    employee_probationenddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_contractenddate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    employee_religion: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    employee_ethnic: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contract_period: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    probation_period: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    employee_sign: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    certificate: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'employee_list',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "employee_id" },
        ]
      },
      {
        name: "employee_list_job_title_id_index",
        using: "BTREE",
        fields: [
          { name: "job_title_id" },
        ]
      },
    ]
  });
};
