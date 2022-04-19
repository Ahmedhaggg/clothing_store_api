let { Order, User, Address, City, Governorate } = require("../../models");

exports.getAllSales = async () => await Order.findAll({
    where: { complete: true },
    attributes: ["id", "amount", "createdAt", ["updatedAt", "completedAt" ]],
    include: [
        {
            model: User,
            attributes: ["id", "name"]
        },
        {
            model: Address,
            attributes: [],
            include: [
                {
                    model: City,
                    attributes: ["id", "name"]
                }, 
                {
                    model: Governorate,
                    attributes: ["id", "name"]
                }
            ]
        }
    ]
})

exports.getSalesByQuery = async query => await Order.findAll(query);
