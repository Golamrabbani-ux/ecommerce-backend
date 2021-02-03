const express = require('express');
const { requireSignin} = require('../common-middlwear');
const { createProduct, productsBySlug } = require('../controller/product');
const multer  = require('multer');
const shortid = require('shortid');
const path = require('path');
const route = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage });


route.post('/product/create', requireSignin, upload.array('productPictures'), createProduct)
route.get('/products/:slug', productsBySlug)


module.exports = route;