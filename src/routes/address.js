const express = require('express');
const { requireSignin } = require('../common-middlwear');
const { addAddress, getAddress } = require('../controller/address');

const route = express.Router();

route.post('/user/create/address', requireSignin, addAddress)
route.get('/user/getaddress', requireSignin, getAddress)


module.exports = route;