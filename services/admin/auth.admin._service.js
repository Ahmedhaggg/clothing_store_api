let Admin = require("../../models/admin.model");

exports.getAdmin = async email => {
    return await Admin.findOne({where: {email}});
} 
exports.createAdmin = async newData => {
    let newAdmin = Admin.create(newData);
    return newAdmin;
}