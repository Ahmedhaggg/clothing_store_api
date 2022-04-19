let Admin = require("../../models/admin.model");

exports.getAdmin = async query => await Admin.findOne({ where: query });
exports.createAdmin = async newData => await Admin.create(newData);
