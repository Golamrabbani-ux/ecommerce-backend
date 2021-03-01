const express = require('express');
const { requireSignin } = require('../common-middlwear');
const { addOrder, getOrder } = require('../controller/order');

const route = express.Router();

route.post('/addorder', requireSignin, addOrder)
route.get('/getorder', requireSignin, getOrder)

module.exports = route;