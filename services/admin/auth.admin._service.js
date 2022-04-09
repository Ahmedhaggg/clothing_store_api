let Admin = require("../../models/admin.model");

exports.getAdmin = async email => await Admin.findOne({ where: { email } });
exports.createAdmin = async newData => await Admin.create(newData);
