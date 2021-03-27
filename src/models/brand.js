const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true,
        unique: true
    },
    cid:{
        type: mongoose.Types.ObjectId,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    brandImage:{
        type: String,
        required: true
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required: true
    },
}, {timestamps: true})

module.exports = mongoose.model('Brands', brandSchema)