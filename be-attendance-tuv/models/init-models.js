var DataTypes = require("sequelize").DataTypes;
var _announcement = require("./announcement");
var _audit_detail = require("./audit_detail");
var _audit_log = require("./audit_log");
var _children = require("./children");
var _claim = require("./claim");
var _claim_type = require("./claim_type");
var _department_job_title = require("./department_job_title");
var _departments = require("./departments");
var _divisions = require("./divisions");
var _document_monitor_attachments = require("./document_monitor_attachments");
var _document_monitors = require("./document_monitors");
var _education = require("./education");
var _employee_attendance = require("./employee_attendance");
var _employee_job_title_histories = require("./employee_job_title_histories");
var _employee_list = require("./employee_list");
var _employee_request = require("./employee_request");
var _employee_request_comment = require("./employee_request_comment");
var _event = require("./event");
var _experience = require("./experience");
var _father = require("./father");
var _fin_payable = require("./fin_payable");
var _fin_supplier = require("./fin_supplier");
var _inv_device = require("./inv_device");
var _job_levels = require("./job_levels");
var _job_title_kpi = require("./job_title_kpi");
var _job_title_merit = require("./job_title_merit");
var _job_titles = require("./job_titles");
var _kpi_appraisal_approvals = require("./kpi_appraisal_approvals");
var _kpi_appraisal_item_attachments = require("./kpi_appraisal_item_attachments");
var _kpi_appraisal_items = require("./kpi_appraisal_items");
var _kpi_appraisals = require("./kpi_appraisals");
var _kpi_parameter_categories = require("./kpi_parameter_categories");
var _kpi_parameter_weights = require("./kpi_parameter_weights");
var _kpi_parameters = require("./kpi_parameters");
var _kpis = require("./kpis");
var _leave_permit = require("./leave_permit");
var _leave_type = require("./leave_type");
var _merit_appraisals = require("./merit_appraisals");
var _merit_factors = require("./merit_factors");
var _merits = require("./merits");
var _migrations = require("./migrations");
var _mother = require("./mother");
var _obs = require("./obs");
var _options = require("./options");
var _origin_users = require("./origin_users");
var _password_resets = require("./password_resets");
var _policy = require("./policy");
var _role_access = require("./role_access");
var _spouse = require("./spouse");
var _surat_keterangan = require("./surat_keterangan");
var _training = require("./training");
var _user_files = require("./user_files");
var _users = require("./users");

function initModels(sequelize) {
  var announcement = _announcement(sequelize, DataTypes);
  var audit_detail = _audit_detail(sequelize, DataTypes);
  var audit_log = _audit_log(sequelize, DataTypes);
  var children = _children(sequelize, DataTypes);
  var claim = _claim(sequelize, DataTypes);
  var claim_type = _claim_type(sequelize, DataTypes);
  var department_job_title = _department_job_title(sequelize, DataTypes);
  var departments = _departments(sequelize, DataTypes);
  var divisions = _divisions(sequelize, DataTypes);
  var document_monitor_attachments = _document_monitor_attachments(sequelize, DataTypes);
  var document_monitors = _document_monitors(sequelize, DataTypes);
  var education = _education(sequelize, DataTypes);
  var employee_attendance = _employee_attendance(sequelize, DataTypes);
  var employee_job_title_histories = _employee_job_title_histories(sequelize, DataTypes);
  var employee_list = _employee_list(sequelize, DataTypes);
  var employee_request = _employee_request(sequelize, DataTypes);
  var employee_request_comment = _employee_request_comment(sequelize, DataTypes);
  var event = _event(sequelize, DataTypes);
  var experience = _experience(sequelize, DataTypes);
  var father = _father(sequelize, DataTypes);
  var fin_payable = _fin_payable(sequelize, DataTypes);
  var fin_supplier = _fin_supplier(sequelize, DataTypes);
  var inv_device = _inv_device(sequelize, DataTypes);
  var job_levels = _job_levels(sequelize, DataTypes);
  var job_title_kpi = _job_title_kpi(sequelize, DataTypes);
  var job_title_merit = _job_title_merit(sequelize, DataTypes);
  var job_titles = _job_titles(sequelize, DataTypes);
  var kpi_appraisal_approvals = _kpi_appraisal_approvals(sequelize, DataTypes);
  var kpi_appraisal_item_attachments = _kpi_appraisal_item_attachments(sequelize, DataTypes);
  var kpi_appraisal_items = _kpi_appraisal_items(sequelize, DataTypes);
  var kpi_appraisals = _kpi_appraisals(sequelize, DataTypes);
  var kpi_parameter_categories = _kpi_parameter_categories(sequelize, DataTypes);
  var kpi_parameter_weights = _kpi_parameter_weights(sequelize, DataTypes);
  var kpi_parameters = _kpi_parameters(sequelize, DataTypes);
  var kpis = _kpis(sequelize, DataTypes);
  var leave_permit = _leave_permit(sequelize, DataTypes);
  var leave_type = _leave_type(sequelize, DataTypes);
  var merit_appraisals = _merit_appraisals(sequelize, DataTypes);
  var merit_factors = _merit_factors(sequelize, DataTypes);
  var merits = _merits(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var mother = _mother(sequelize, DataTypes);
  var obs = _obs(sequelize, DataTypes);
  var options = _options(sequelize, DataTypes);
  var origin_users = _origin_users(sequelize, DataTypes);
  var password_resets = _password_resets(sequelize, DataTypes);
  var policy = _policy(sequelize, DataTypes);
  var role_access = _role_access(sequelize, DataTypes);
  var spouse = _spouse(sequelize, DataTypes);
  var surat_keterangan = _surat_keterangan(sequelize, DataTypes);
  var training = _training(sequelize, DataTypes);
  var user_files = _user_files(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  department_job_title.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(department_job_title, { as: "department_job_titles", foreignKey: "department_id"});
  document_monitors.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(document_monitors, { as: "document_monitors", foreignKey: "department_id"});
  kpi_appraisals.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(kpi_appraisals, { as: "kpi_appraisals", foreignKey: "department_id"});
  kpis.belongsTo(departments, { as: "department", foreignKey: "department_id"});
  departments.hasMany(kpis, { as: "kpis", foreignKey: "department_id"});
  document_monitor_attachments.belongsTo(document_monitors, { as: "document_monitor", foreignKey: "document_monitor_id"});
  document_monitors.hasMany(document_monitor_attachments, { as: "document_monitor_attachments", foreignKey: "document_monitor_id"});
  kpi_appraisals.belongsTo(employee_list, { as: "employee", foreignKey: "employee_id"});
  employee_list.hasMany(kpi_appraisals, { as: "kpi_appraisals", foreignKey: "employee_id"});
  leave_permit.belongsTo(employee_list, { as: "employee", foreignKey: "employee_id"});
  employee_list.hasMany(leave_permit, { as: "leave_permits", foreignKey: "employee_id"});
  merit_appraisals.belongsTo(employee_list, { as: "employee", foreignKey: "employee_id"});
  employee_list.hasMany(merit_appraisals, { as: "merit_appraisals", foreignKey: "employee_id"});
  fin_payable.belongsTo(fin_supplier, { as: "supplier", foreignKey: "supplier_id"});
  fin_supplier.hasMany(fin_payable, { as: "fin_payables", foreignKey: "supplier_id"});
  job_titles.belongsTo(job_levels, { as: "job_level", foreignKey: "job_level_id"});
  job_levels.hasMany(job_titles, { as: "job_titles", foreignKey: "job_level_id"});
  department_job_title.belongsTo(job_titles, { as: "job_title", foreignKey: "job_title_id"});
  job_titles.hasMany(department_job_title, { as: "department_job_titles", foreignKey: "job_title_id"});
  employee_list.belongsTo(job_titles, { as: "job_title", foreignKey: "job_title_id"});
  job_titles.hasMany(employee_list, { as: "employee_lists", foreignKey: "job_title_id"});
  job_title_kpi.belongsTo(job_titles, { as: "job_title", foreignKey: "job_title_id"});
  job_titles.hasMany(job_title_kpi, { as: "job_title_kpis", foreignKey: "job_title_id"});
  job_title_merit.belongsTo(job_titles, { as: "job_title", foreignKey: "job_title_id"});
  job_titles.hasMany(job_title_merit, { as: "job_title_merits", foreignKey: "job_title_id"});
  kpis.belongsTo(job_titles, { as: "job_title", foreignKey: "job_title_id"});
  job_titles.hasMany(kpis, { as: "kpis", foreignKey: "job_title_id"});
  origin_users.belongsTo(job_titles, { as: "job_title", foreignKey: "job_title_id"});
  job_titles.hasMany(origin_users, { as: "origin_users", foreignKey: "job_title_id"});
  kpi_appraisal_item_attachments.belongsTo(kpi_appraisal_items, { as: "kpi_appraisal_item", foreignKey: "kpi_appraisal_item_id"});
  kpi_appraisal_items.hasMany(kpi_appraisal_item_attachments, { as: "kpi_appraisal_item_attachments", foreignKey: "kpi_appraisal_item_id"});
  kpi_appraisal_items.belongsTo(kpi_appraisals, { as: "kpi_appraisal", foreignKey: "kpi_appraisal_id"});
  kpi_appraisals.hasMany(kpi_appraisal_items, { as: "kpi_appraisal_items", foreignKey: "kpi_appraisal_id"});
  kpi_parameters.belongsTo(kpi_parameter_categories, { as: "kpi_parameter_category", foreignKey: "kpi_parameter_category_id"});
  kpi_parameter_categories.hasMany(kpi_parameters, { as: "kpi_parameters", foreignKey: "kpi_parameter_category_id"});
  kpi_appraisal_items.belongsTo(kpi_parameters, { as: "kpi_parameter", foreignKey: "kpi_parameter_id"});
  kpi_parameters.hasMany(kpi_appraisal_items, { as: "kpi_appraisal_items", foreignKey: "kpi_parameter_id"});
  kpi_parameter_weights.belongsTo(kpi_parameters, { as: "kpi_parameter", foreignKey: "kpi_parameter_id"});
  kpi_parameters.hasMany(kpi_parameter_weights, { as: "kpi_parameter_weights", foreignKey: "kpi_parameter_id"});
  job_title_kpi.belongsTo(kpis, { as: "kpi", foreignKey: "kpi_id"});
  kpis.hasMany(job_title_kpi, { as: "job_title_kpis", foreignKey: "kpi_id"});
  kpi_appraisals.belongsTo(kpis, { as: "kpi", foreignKey: "kpi_id"});
  kpis.hasMany(kpi_appraisals, { as: "kpi_appraisals", foreignKey: "kpi_id"});
  kpi_parameter_weights.belongsTo(kpis, { as: "kpi", foreignKey: "kpi_id"});
  kpis.hasMany(kpi_parameter_weights, { as: "kpi_parameter_weights", foreignKey: "kpi_id"});
  kpi_parameters.belongsTo(kpis, { as: "kpi", foreignKey: "kpi_id"});
  kpis.hasMany(kpi_parameters, { as: "kpi_parameters", foreignKey: "kpi_id"});
  merits.belongsTo(merit_factors, { as: "merit_factor", foreignKey: "merit_factor_id"});
  merit_factors.hasMany(merits, { as: "merits", foreignKey: "merit_factor_id"});
  job_title_merit.belongsTo(merits, { as: "merit", foreignKey: "merit_id"});
  merits.hasMany(job_title_merit, { as: "job_title_merits", foreignKey: "merit_id"});
  merit_appraisals.belongsTo(merits, { as: "merit", foreignKey: "merit_id"});
  merits.hasMany(merit_appraisals, { as: "merit_appraisals", foreignKey: "merit_id"});
  departments.belongsTo(obs, { as: "ob", foreignKey: "obs_id"});
  obs.hasMany(departments, { as: "departments", foreignKey: "obs_id"});
  origin_users.belongsTo(role_access, { as: "role", foreignKey: "role_id"});
  role_access.hasMany(origin_users, { as: "origin_users", foreignKey: "role_id"});
  users.belongsTo(role_access, { as: "role", foreignKey: "role_id"});
  role_access.hasMany(users, { as: "users", foreignKey: "role_id"});
  document_monitor_attachments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(document_monitor_attachments, { as: "document_monitor_attachments", foreignKey: "user_id"});
  employee_attendance.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(employee_attendance, { as: "employee_attendances", foreignKey: "user_id"});
  kpi_appraisal_item_attachments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(kpi_appraisal_item_attachments, { as: "kpi_appraisal_item_attachments", foreignKey: "user_id"});
  kpi_appraisal_items.belongsTo(users, { as: "appraiser", foreignKey: "appraiser_id"});
  users.hasMany(kpi_appraisal_items, { as: "kpi_appraisal_items", foreignKey: "appraiser_id"});
  merit_appraisals.belongsTo(users, { as: "appraiser", foreignKey: "appraiser_id"});
  users.hasMany(merit_appraisals, { as: "merit_appraisals", foreignKey: "appraiser_id"});
  user_files.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(user_files, { as: "user_files", foreignKey: "user_id"});

  return {
    announcement,
    audit_detail,
    audit_log,
    children,
    claim,
    claim_type,
    department_job_title,
    departments,
    divisions,
    document_monitor_attachments,
    document_monitors,
    education,
    employee_attendance,
    employee_job_title_histories,
    employee_list,
    employee_request,
    employee_request_comment,
    event,
    experience,
    father,
    fin_payable,
    fin_supplier,
    inv_device,
    job_levels,
    job_title_kpi,
    job_title_merit,
    job_titles,
    kpi_appraisal_approvals,
    kpi_appraisal_item_attachments,
    kpi_appraisal_items,
    kpi_appraisals,
    kpi_parameter_categories,
    kpi_parameter_weights,
    kpi_parameters,
    kpis,
    leave_permit,
    leave_type,
    merit_appraisals,
    merit_factors,
    merits,
    migrations,
    mother,
    obs,
    options,
    origin_users,
    password_resets,
    policy,
    role_access,
    spouse,
    surat_keterangan,
    training,
    user_files,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
