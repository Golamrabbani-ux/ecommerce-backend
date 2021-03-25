const express = require('express');
const { requireSignin } = require('../common-middlwear');
const { addOrder, getOrders, getOrder } = require('../controller/order');

const route = express.Router();

route.post('/addorder', requireSignin, addOrder)
route.get('/getorders', requireSignin, getOrders)
route.post('/getorder', requireSignin, getOrder)

module.exports = route;