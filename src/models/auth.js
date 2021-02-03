const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 15
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 15
    },
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    contactNumber: {type: String},
    profilePicture: {type: String}

}, {timestamps: true})

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password, 10)
})
userSchema.methods={
    authenticate: function(password){
        return bcrypt.compare(password, this.hash_password)
    }
}

module.exports = mongoose.model('User',  userSchema)