let offerService = require("../../services/admin/offer.admin._service");
let fs = require("fs");
let { OFFERSIMAGESDIR } = require("../../config/index")
let slugify = require("slugify");
const path = require("path");


exports.count = async (req, res, next) => {
    let query  = req.query.active === "true" ? { active: true } 
        : req.query.active === "false" ?  {active: false } 
        : {};

    let numberOfOffers = await offerService.count(query);
    
    res.status(200).json({
        success: true,
        numberOfOffers
    });
}

exports.index = async (req, res, next) => {
    let { active, name } = req.query;

    let query = {};

    query.active = active === "true" ? true : false;
    name ? (query.name = name) : false;

    let offers = await offerService.getAllOffers(query);
    
    return res.status(200).json({
        success: true, 
        offers
    });
}

exports.store = async (req, res, next) => {
    console.log(req.body)
    let { name, price, description, expiresin, offerProducts} = req.body;
    let image = req.file.filename;
    let slug = slugify(name);

    let newOffer = await offerService.createOffer({
        name,
        price,
        description,
        slug,
        image,
        expiresin
    }, offerProducts);

    if (newOffer) 
        return res.status(201).json({
            success: true,
            message: "offer is created successfully",
            offer: newOffer
        })
    
    await fs.unlinkSync(path.join(OFFERSIMAGESDIR, image));
    
    res.status(400).json({
        success: false,
        message: "can't create offer check your enter data"
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
        return res.status(404).json({
            success: false,
            message: "offer is not found"
        })
     
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
        await fs.unlinkSync(path.join(OFFERSIMAGESDIR, image));
        return res.status(404).json({
            success: false,
            message: "can't update image of this offer, offer is not found"
        })
    }
    
    let updateOffer = await offerService.updateOffer({ id }, { image});

    if (!updateOffer) {
        await fs.unlinkSync(path.join(OFFERSIMAGESDIR, image));
        return res.status(404).json({
            success: false,
            message: "can't update image of this offer, check your data"
        })
    }

    await fs.unlinkSync(path.join(OFFERSIMAGESDIR, lastOfferData.image));

    res.status(200).json({
        success: true,
        message: "offer image is updated successfully"
    });

}


exports.active = async (req, res, next) => {
    let { id } = req.params;

    let offer = await offerService.getSomeOfferData({ id }, ["id", "active"]);
 
    if (!offer)
        return res.status(404).json({
            success: false,
            message: "offer is not found"
        });

    if (offer.active === true)
        return res.status(400).json({
            success: false,
            message: "this offer is actived already"
        })

    await offerService.updateOffer({ id }, { active: true });
    
    res.status(200).json({
        success: true,
        message: "offer is active successfully"
    });
}
exports.unactive = async (req, res, next) => {
    let { id } = req.params;

    let offer = await offerService.getSomeOfferData({ id }, ["id", "active"]);
 
    if (!offer)
        return res.status(404).json({
            success: false,
            message: "offer is not found"
        });
        
    if (offer.active === false)
        return res.status(400).json({
            success: false,
            message: "this offer is unactived already"
        })

    await offerService.updateOffer({ id }, { active: false });
    
    res.status(200).json({
        success: true,
        message: "offer is unactive successfully"
    });
}
