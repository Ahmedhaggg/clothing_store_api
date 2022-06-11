let offerService = require("../../services/users/offer.user._service");


exports.index = async (req, res, next) => {
    
    let offers = await offerService.getOffers()

    res.status(200).json({
        success: true,
        offers
    });

}


exports.show = async (req, res, next) => {
    let { id } = req.params;

    let offer = await offerService.getOffer({ id });
    
    if (!offer)
        return res.status(404).json({
            success: false,
            message: "offer is not found"
        });

    res.status(200).json({
        success: true,
        offer
    });
}