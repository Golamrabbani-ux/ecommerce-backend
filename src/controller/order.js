const Order = require('../models/order');
const Address = require('../models/address');

exports.addOrder = (req, res) => {
    req.body.user = req.user._id
    req.body.orderStatus = [
        {
            type: "ordered",
            date: new Date(),
            isCompleted: true,
        },
        {
            type: "packed",
            isCompleted: false,
        },
        {
            type: "shipped",
            isCompleted: false,
        },
        {
            type: "delivered",
            isCompleted: false,
        },
    ];
    const order = new Order(req.body)
    order.save((error, order) => {
        if (error) return res.status(400).json({ error });
        if (order) {
            return res.status(201).json({ order });
        }
    })
}
exports.getOrders = (req, res) => {
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

exports.getOrder = (req, res) =>{
    Order.findById({_id: req.body.orderId})
    .populate("items.productId", "productName price productPictures category")//"productName price productPictures"
    .populate("productId.category")
    .exec((error, order)=>{
        if(error) return res.status(400).json({error})
        if(order){
            Address.findOne({user: req.user._id}).exec((error, address)=>{
                if(error) return res.status(400).json({error});
                if(address){
                    const userAddress= address.address.find(adr => adr._id.toString() === order.addressId.toString())
                    return res.status(200).json({order, address: userAddress})
                }
            })
        }
    })
}