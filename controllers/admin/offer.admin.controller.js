let offerService = require("../../services/admin/offer.admin._service");
let fs = require("fs");
let { UPLOADSDIR } = require("../../config/index")
let slugify = require("slugify");
const path = require("path");

exports.index = async (req, res, next) => {
    let offers = await offerService.getAllOffers();
    return res.status(200).json({
        success: true, 
        offers
    });
}

exports.store = async (req, res, next) => {
    let { name, price, description, expiresin, offerProducts} = req.body;
    let image = req.file.filename
    let slug = slugify(name);

    let newOffer = await offerService.createOffer({
        name,
        price,
        description,
        slug,
        image,
        expiresin
    }, offerProducts);

    if (!newOffer === false) 
        return res.status(201).json({
            success: true,
            message: "offer is created successfully",
            offer: newOffer
        })
    
    await fs.unlinkSync(path.join(UPLOADSDIR, lastProductData.image));
    
    res.status(400).json({
        success: false,
        message: "can't create offer check your enter data"
    });
}



exports.show = async (req, res, next) => {
    let { id } = req.body;

    let offer = await offerService.getOffer({ id });

    if (!offer) 
        res.status(404).json({
            success: false,
            message: "offer is not found"
        });
    else 
        res.status(200).json({
            success: true,
            offer
        })
}

exports.update = async (req, res, next) => {
    let { name, price, description, expiresin } = req.body;
    let { id } = req.params;

    let updateOffer = await offerService.updateOffer({ id }, {
        name, 
        price,
        description,
        expiresin
    });

    if (updateOffer === false)
        res.status(400).json({
            success: false,
            message: "offer is not updated, check data of this product"
        })
    else 
        res.status(200).json({
            success: true,
            message: "offer is updated successfully"
        })
}

exports.updateImage = async (req, res, next) => {
    let { id } = req.params;
    let image = req.file.filename;
    
    let lastOfferData = await offerService.getSomeOfferData({ id }, ["image"]);

    if (!lastOfferData) {
        await fs.unlinkSync(path.join(UPLOADSDIR, image));
        return res.status(404).json({
            success: false,
            message: "can't update image of this offer, offer is not found"
        })
    }
    
    let updateOffer = await offerService.updateOffer({ id }, { image});

    if (!updateOffer) {
        await fs.unlinkSync(path.join(UPLOADSDIR, image));
        return res.status(404).json({
            success: false,
            message: "can't update image of this offer, check your data"
        })
    }

    await fs.unlinkSync(path.join(UPLOADSDIR, lastOfferData.image));

    res.status(200).json({
        success: true,
        message: "offer image is updated successfully"
    });

}


exports.active = async (req, res, next) => {
    let { id } = req.params;

    
    let activeOffer = await offerService.updateOffer({ id }, { active: true });

    if (activeOffer === false)
        res.status(400).json({
            success: false,
            message: "can't active this offer"
        })
    else 
        res.status(200).json({
            success: true,
            message: "offer is active successfully"
        })
}
exports.unactive = async (req, res, next) => {
    let { id } = req.params;

    let unactiveOffer = await offerService.updateOffer({ id }, { active: false });

    if (unactiveOffer === false)
        res.status(400).json({
            success: false,
            message: "can't unactive this offer"
        })
    else 
        res.status(200).json({
            success: true,
            message: "offer is unactive successfully"
        })
}
