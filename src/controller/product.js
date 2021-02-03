const slugify = require('slugify');
const User = require('../models/auth');
const Product = require('../models/product')
const Category = require('../models/category')

exports.createProduct = (req, res) => {
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error })
            if (user.role === 'admin') {
                const { productName, price, quantity, description, category } = req.body;
                let productPictures = [];
                if (req.files.length > 0) {
                    productPictures = req.files.map(file => {
                        return { img: file.filename }
                    })
                }
                const product = new Product({
                    productName,
                    slug: slugify(productName),
                    price,
                    quantity,
                    description,
                    category,
                    productPictures,
                    creatBy: user._id
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
    Category.findOne({ slug: slug })
        .exec((error, category) => {
            if (error) return res.status(400).json({ error });
            Product.find({ category: category._id })
                .exec((err, products) => {
                    if (err) return res.status(400).json({ err });

                    const productsByPrice={
                        under5k: products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price >= 5000 && product.price <= 10000 ),
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