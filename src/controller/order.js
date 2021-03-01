const Order = require('../models/order');

exports.addOrder = (req, res) => {
    req.body.user = req.user._id
    // console.log(req.body.items);
    const order = new Order(req.body)
    order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
            console.log(order);
            return res.status(201).json({ order });
        }
    })
}
exports.getOrder = (req, res) => {
    Order.find({ user: req.user._id })
        .select("_id paymentStatus items")
        .populate("items.productId", "_id productName price productPictures")
        .exec((error, orders) => {
            if (error) return res.status(400).json({ error });
            if (orders) {
                res.status(200).json({ orders });
            }
        });
}