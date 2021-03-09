const Order = require("../../models/order");
const User = require('../../models/auth');

exports.updateOrder = (req, res) => {
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            else if (user.role === 'admin') {
                Order.updateOne(
                    { _id: req.body.orderId, "orderStatus.type": req.body.type },
                    {
                        $set: {
                            "orderStatus.$": [
                                { type: req.body.type, date: new Date(), isCompleted: true },
                            ],
                        },
                    }
                ).exec((error, order) => {
                    if (error) return res.status(400).json({ error });
                    if (order) {
                        res.status(201).json({ order });
                    }
                });
            }
            else {
                if (error) return res.status(400).json({ message: "Admin access only" });
            }
        })
};

// exports.getAllorder = async (req, res) => {
//     const orders = await Order.find({})
//         .populate("items.productId", "productName")
//         // .populate("addressId._id", "fullName")
//         .exec();
//     res.status(200).json({ orders });
// }

exports.getAllorder = (req, res) => {
    User.findById({ _id: req.user._id })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            else if (user.role === 'admin') {
                Order.find({}).populate("items.productId", "productName")
                    .exec((error, order) => {
                        if (error) return res.status(400).json({ error });
                        if (order) {
                            res.status(200).json({ order });
                        }
                    })
            }
            else {
                if (error) return res.status(400).json({ message: "Admin access only" });
            }
        })
}