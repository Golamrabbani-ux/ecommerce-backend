const User = require('../../models/auth');
const Brand = require('../../models/brand');
const slugify = require("slugify");

exports.addBrand = (req, res) => {
    const { name, cid, type } = req.body;
    if (name && cid && type && req.file) {
        User.findById({ _id: req.user._id }).exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.role === 'admin') {
                    const brandsObj = {
                        name,
                        slug: slugify(name),
                        cid,
                        type,
                        brandImage: req.file.filename,
                        createdBy: req.user._id
                    }
                    const brand = new Brand(brandsObj)
                    brand.save((err, brandInfo) => {
                        if (err) return res.status(400).json({ err });
                        if (brandInfo) {
                            res.status(201).json({ brandsObj })
                        }
                    })
                }
                else {
                    return res.status(404).json({ message: "Admin access only" })
                }
            }
        })
    }
    else{
        return res.status(400).json({message: "All Filed is not complected"})
    }
}
exports.deleteBrand = (req, res) =>{
    User.findById({_id: req.user._id}).exec((error, user)=>{
        if(error) return res.status(400).json({error});
        if(user.role === 'admin'){
            Brand.findByIdAndDelete({_id: req.params.id}).exec((error, brandInfo)=>{
                if(error) return res.status(400).json({error});
                if(brandInfo){
                    res.status(200).json({brandInfo, message:'Delete Successfully'});
                }
            })
        }
        else{
            return res.status(400).json({message: "Admin access only"})
        }
    })
}
exports.getBrands = (req, res) =>{
    Brand.find({}).exec((error, brandsInfo) =>{
        if(error) return res.status(400).json({error});
        if(brandsInfo) return res.status(200).json({brandsInfo})
    })
}