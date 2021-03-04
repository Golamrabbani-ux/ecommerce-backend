const express = require('express');
const { requireSignin, upload } = require('../../common-middlwear');
const { addBrand, getBrands, deleteBrand } = require('../../controller/admin/brand');

const route = express.Router();

route.post('/add-brand', requireSignin, upload.single("brandImage"), addBrand);
route.delete('/delete-brand/:id', requireSignin, deleteBrand)
route.get('/get-brands', getBrands)

module.exports = route;