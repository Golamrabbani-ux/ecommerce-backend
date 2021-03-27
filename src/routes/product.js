const express = require('express');
const { requireSignin, upload} = require('../common-middlwear');
const { createProduct, productsBySlug, getProductDetailsById } = require('../controller/product');

const route = express.Router();

route.post('/product/create', requireSignin, upload.array('productPictures'), createProduct)
route.get('/products/:slug', productsBySlug)
route.get('/allProducts/:productId', getProductDetailsById)


module.exports = route;