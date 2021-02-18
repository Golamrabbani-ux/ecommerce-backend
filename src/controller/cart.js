const User = require('../models/auth');
const Cart = require('../models/cart');

exports.addItemsToCart = (req, res) => {
   
    Cart.findOne({user: req.user._id})
    .exec((error, cart) =>{
        if(error) return res.status(400).json({error})
        if(cart){
            const isItemAdded = cart.cartItems.find(c => c.product == req.body.cartItems.product);
            if(isItemAdded){
                //Product quantity Added
                Cart.findOneAndUpdate({user: req.user._id, "cartItems.product": req.body.cartItems.product},{
                    "$set": {
                        "cartItems.$": {
                            ...req.body.cartItems,
                            quantity: req.body.cartItems.quantity + 1
                        }
                    }
                })
                .exec((error, _cart) =>{
                    if(error) return res.status(400).json({error});
                    if(_cart){
                        return res.status(201).json({cart: _cart, msg: "quantityAdded"})
                    }
                })
            }
            //Product one Time added
            else{
                Cart.findOneAndUpdate({user: req.user._id},{
                    "$push": {
                        "cartItems": req.body.cartItems
                    }
                })
                .exec((error, _cart) =>{
                    if(error) return res.status(400).json({error});
                    if(_cart){
                        return res.status(201).json({cart: _cart})
                    }
                })
            }
        }
        //new user product added
        else{
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]
            })
            cart.save((error, cart) =>{
                if(error) return res.status(400).json({error});
                if(cart){
                    return res.status(201).json({cart})
                }
            })
        }
    })
}