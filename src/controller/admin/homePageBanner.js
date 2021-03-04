const HomePageBanner = require('../../models/homePageBanner');

const bodyInfo = (files, body) =>{
    let bannerPics = [];
    if (files.length > 0) {
        files.map(file => {
            bannerPics.push({ img: file.filename })
        })
    }
    const bannerObj = {
        categoryName: body.categoryName,
        type: body.type,
        bannerPics
    }
    return bannerObj;
}

exports.addHomePageBanner = (req, res) => {
    const bannerObj = bodyInfo(req.files, req.body);
    const banner = new HomePageBanner(bannerObj);
    banner.save((error, bannerInfo) => {
        if (error) return res.status(400).json({ error });
        if (bannerInfo) {
            return res.status(201).json({ bannerInfo })
        }
    })
}

exports.homePageBannerUpdate = (req, res) =>{
    const bannerObj = bodyInfo(req.files, req.body);
    HomePageBanner.findByIdAndUpdate({_id: req.params.id}, bannerObj, {new: true}, (error, bannerInfo)=>{
        if (error) return res.status(400).json({ error });
        if (bannerInfo) {
            return res.status(201).json({ bannerInfo })
        }
    })
}

exports.getBannerInfo = (req, res) => {
    HomePageBanner.find({}).exec((error, bannerInfo) => {
        if (error) return res.status(400).json({ error });
        if (bannerInfo) {
            return res.status(200).json({ bannerInfo })
        }
    })
}
exports.deleteBanner = (req, res) =>{
    HomePageBanner.findByIdAndRemove({_id: req.params.id}).exec((error, deleteInfo) =>{
        if (error) return res.status(400).json({ error });
        if (deleteInfo) {
            return res.status(200).json({ deleteInfo })
        }
    })
}
exports.getSingleBanner = (req, res) =>{
    HomePageBanner.findById({_id: req.params.id}).exec((error, bannerInfo) => {
        if (error) return res.status(400).json({ error });
        if (bannerInfo) {
            return res.status(200).json({ bannerInfo })
        }
    })
}