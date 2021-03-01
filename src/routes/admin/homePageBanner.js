const express = require('express');
const { upload } = require('../../common-middlwear');
const { addHomePageBanner, getBannerInfo, homePageBannerUpdate, getSingleBanner, deleteBanner } = require('../../controller/admin/homePageBanner');

const route = express.Router();

route.post('/home-page/banner/add', upload.array("bannerPics"), addHomePageBanner);
route.patch('/home-page/banner/edit/:id', upload.array("bannerPics"), homePageBannerUpdate);
route.delete('/home-page/banner/delete/:id', deleteBanner);
route.get('/home-page/get-single-banner/:id', getSingleBanner)
route.get('/home-page/get-banner', getBannerInfo)

module.exports = route;