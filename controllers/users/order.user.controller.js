let orderService = require("../../services/users/order.user._service");

let payment = require("../../helpers/payment");

class Order { 
    
    static getTotalPrice(totalPrice, cityShippingCost) {
        return totalPrice + cityShippingCost * 100;
    } 
    static async pay(data) {
        return await payment.pay(data);
    }
    static chec
    static filterOfferData(offersData) {
        let offerProductsColors = [];
        let offerProducts = [];

        

        offersData.forEach(offer => {
            offers.push({
                offerId: offer.id,
                quantity: offer.quantity,
                pricePerUnit: offer.pricePerUnit,
                totalPrice: offer.totalPrice
            });
            offer.products.forEach(product => {
                offerProducts.push({
                    productId: product.id,
                    quantity: product.quantity,
                    pricePerUnit: product.pricePerUnit,
                    totalPrice: product.totalPrice,
                    offerId: offer.id
                });
            })
        });
    }
}


exports.store = async (req, res, res) => {
    let { userId } = req.user;
    let { paymentToken, orderProducts, orderOffers, addressId, cityShippingCost, totalPrice } = req.body
    
    let amount = totalPrice + cityShippingCost;
    let checkout = await stripe.charges.create({
        amount,
        source: paymentToken,
        currency: "usd"
    }); 
    
    let newOrder = await orderService.createOrder(
        {
            userId,
            totalPrice: amount,
            amount,
            addressId
        },
        orderProducts,
        orderOffers
    )
}

 {
    paymentToken: "",
    totalPrice,
    cityShippingCost,
    addressId,
    offers: {
        offerId,
        offerProducts: [
            {
                productId,
                quantity: 10,
                colors: [
                    {color: "red", quantity: 5},
                    {color: "blue", quantity: 5},
                ]
            }

        ],
        
    },
    products: [
            {
                productId,
                quantity: 10,
                colors: [
                    {color: "red", quantity: 5},
                    {color: "blue", quantity: 5},
                ]
            }

        ],
}