let { STRIPE_KEY } = require("../config/index");
const stripe = require("stripe")(STRIPE_KEY);

exports.pay = async data => {
    try { 
        let checkout = await stripe.charges.create(data);
        return {
            success: true,
            amount: checkout.amount,
            id: checkout.id
        };
    } catch (error) {
        return {
            success: false,
            error
        }
    }
}
exports.retrieve = async chargeId => {
    try {
        let retrieveCharge = await stripe.charges.refunded
        
        return retrieveCharge;
    } catch (error) {
        console.log(error);
        return false;
    }
}