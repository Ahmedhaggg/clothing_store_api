const { User } = require("../../models");

exports.getProfile = async query => await User
    .findOne({ 
        where: query,
        attributes: ["firstName", "lastName", "userName", "email", "gender", "phoneNumber", "birthDay"]
    });

