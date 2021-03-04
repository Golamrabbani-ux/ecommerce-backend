const jwt = require('jsonwebtoken');
const multer  = require('multer');
const shortid = require('shortid');
const path = require('path');

exports.requireSignin = (req, res, next) =>{
    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.JWT_TOKEN)
        req.user = decode;
    }else{
        return res.status(400).json({
            message: 'Authorization required'
        })
    }
    next();
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

exports.upload = multer({ storage: storage });