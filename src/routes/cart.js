const express = require('express');
const { requireSignin } = require('../common-middlwear');
const { addItemsToCart } = require('../controller/cart');

const route = express.Router();

route.post('/user/cart/addtocart', requireSignin, addItemsToCart)

module.exports = route;