const express = require('express');
const { upload, requireSignin } = require('../../common-middlwear');
const { page, getPage } = require('../../controller/admin/page');
const route = express.Router();

// route.post('/page', upload.fields([{name: "banners"},{name: "productsPictures"}]), requireSignin, page);
route.get('/page/:category/:type', getPage)


module.exports = route;