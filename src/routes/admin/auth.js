const express = require('express');
const route = express.Router();
const {signup, signin, signout} = require('../../controller/admin/auth');
const { requireSignin} = require('../../common-middlwear');
const { validateSignupRequest, isValidateRequest, validateSigninRequest } = require('../../validators/auth');

route.post('/admin/signup', validateSignupRequest, isValidateRequest, signup)
route.post('/admin/signin', validateSigninRequest, isValidateRequest,  signin)
route.post('/admin/signout', requireSignin, signout)

// route.post('/profile',, (req, res) =>{
//     return res.status(200).json({
//         message: 'user login'
//     })
// })

module.exports = route;