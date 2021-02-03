const express = require('express');
const { requireSignin } = require('../common-middlwear/index');
const {signup, signin} = require('../controller/auth');
const { validateSignupRequest, isValidateRequest, validateSigninRequest } = require('../validators/auth');

const route = express.Router();

route.post('/signup', validateSignupRequest, isValidateRequest, signup)
route.post('/signin', validateSigninRequest, isValidateRequest, signin)

route.post('/profile', requireSignin, (req, res) =>{
    return res.status(200).json({
        message: 'user login'
    })
})

module.exports = route;