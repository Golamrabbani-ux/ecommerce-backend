const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAddress.address',
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            },
            payablePrice: {
                type: Number,
            },
            purchaseQty: {
                type: Number,
            }
        }
    ],
    paymentStatus: {
        type: String,
        required: true,
        enum: ["pending", "complected", "canceled", "refund"]
    },
    paymentType: {
        type: String,
        required: true,
        enum: ["cod", "card"]
    },
    orderStatus: [
        {
            type: {
                type: String,
                enum: ["ordered", "packed", "shipped", "delivered"],
                default: "ordered",
            },
            date: {
                type: Date,
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
        },
    ],
}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema);