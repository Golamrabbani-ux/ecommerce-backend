const slugify = require('slugify');
const User = require('../models/auth');
const Product = require('../models/product')
const Category = require('../models/category')

exports.createProduct = (req, res) => {
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user.role === 'admin') {
                const { productName, price, quantity, description, category, ram, rom, sdCard, battery, processor, warranty, seller, display, appSupported, operatingSupported, refresrate, power, nosie, wifiEnabled } = req.body;
                let productPictures = [];
                if (req.files.length > 0) {
                    productPictures = req.files.map(file => {
                        return { img: file.filename }
                    })
                }
                const product = new Product({
                    productName,
                    slug: slugify(productName),
                    price, quantity, description, category,
                    productPictures, creatBy: user._id,
                    ram: ram || "",
                    rom: rom || "",
                    sdCard: sdCard || "",
                    battery: battery || "",
                    processor: processor || "",
                    warranty: warranty || "",
                    seller: seller || "",
                    display: display || "",
                    appSupported: appSupported || "",
                    operatingSupported: operatingSupported || "",
                    refresrate: refresrate || "",
                    power: power || "",
                    nosie: nosie || "",
                    wifiEnabled: wifiEnabled || ""
                })
                product.save((error, data) => {
                    if (error) return res.status(400).json({ error })
                    if (data) {
                        res.status(201).json({ data })
                    }
                })
            }
            else {
                res.status(400).json({
                    message: "Admin access only"
                })
            }
        })
}

exports.productsBySlug = (req, res) => {
    const { slug } = req.params;
    if (slug === 'undefined') {
        return res.status(400).json({ message: "Params is required" });
    }
    else {
        Category.findOne({ slug: slug })
            .exec((error, category) => {
                if (error) return res.status(400).json({ error });
                Product.find({ category: category._id })
                    .populate({path:"category"})
                    .exec((err, products) => {
                        if (err) return res.status(400).json({ err });

                        const productsByPrice = {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price >= 5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price >= 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price >= 15000 && product.price <= 20000),
                            up20k: products.filter(product => product.price > 20000)
                        }
                        res.status(200).json({
                            products,
                            productsByPrice
                        })
                    })

            })
    }
}

// exports.getSumsungProduct = (req, res) =>{
//     Product.find({category: "603df15e4066620804d24d87"}).exec((error, sumsung)=>{
//         if (error) return res.status(200).json({ error });
//         if(sumsung){
//             return res.status(200).json({ sumsung })
//         }
//     })
// }

exports.getProductDetailsById = (req, res) => {
    const { productId } = req.params;
    if (productId) {
        Product.findById({ _id: productId })
            .populate("category", "_id, name slug")
            .exec((error, product) => {
                if (error) return res.status(200).json({ error })
                else if (product){
                    return res.status(200).json({ product })
                }
                else return res.status(404).json({ message: 'Product Not Found' })
            })
    }
    else return res.status(400).json({ message: 'Params Required' })
}