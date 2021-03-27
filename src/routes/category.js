const express = require('express');
const { requireSignin, upload} = require('../common-middlwear');
const { addCategory, getCategories, categoryOption, updateCategory, deleteCategories } = require('../controller/category');

const route = express.Router();


route.post('/category/create', requireSignin, upload.single('categoryImage'), addCategory)
route.post('/category/update', upload.array('categoryImage'), updateCategory)
route.post('/category/delete', deleteCategories)
route.get('/category/getcategories', upload.array('categoryImage'), getCategories);
route.get('/category/categoryOption', requireSignin, categoryOption)

module.exports = route;