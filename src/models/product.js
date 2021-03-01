const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique:true
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer:{
        type: Number,
    },
    productPictures: [
        {
            img: {
                type: String,
            }
        }
    ],
    review: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    ram: String,
    rom: String,
    sdCard: String,
    battery: String,
    processor:String,
    warranty:String,
    seller:String,
    display:String,
    appSupported:String, 
    operatingSupported:String,
    refresrate:String,
    power:String,
    nosie:String,
    wifiEnabled:String,
    creatBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    updatedAt: Date
}, {timestamps: true})

module.exports =  mongoose.model("Product", productSchema)
