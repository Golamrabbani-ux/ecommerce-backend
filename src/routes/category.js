const express = require('express');
const { requireSignin} = require('../common-middlwear');
const { addCategory, getCategories, categoryOption, updateCategory, deleteCategories } = require('../controller/category');
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

route.post('/category/create', requireSignin, upload.single('categoryImage'), addCategory)
route.post('/category/update', upload.array('categoryImage'), updateCategory)
route.post('/category/delete', deleteCategories)
route.get('/category/getcategories', upload.array('categoryImage'), getCategories);
route.get('/category/categoryOption', requireSignin, categoryOption)

module.exports = route;