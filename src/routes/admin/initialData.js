const express = require('express');
const { initialData } = require('../../controller/admin/initalData');
const route = express.Router();

route.post('/initialdata', initialData)


module.exports = route;