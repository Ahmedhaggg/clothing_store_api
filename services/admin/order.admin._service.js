let { Order } = require("../../models");

exports.updateOrder = async (query, newData) => {
    let updatedOrder = await Order.update(newData, { where: query});

    return updatedOrder[0] === 1 ? true : false;
}