const mongoose = require('mongoose');

const homePageBannerSchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    bannerPics:[
        {
            img:{ type: String, required: true }
        }
    ]
}, {timestamps: true})

module.exports = mongoose.model("Homepagebanner", homePageBannerSchema)
