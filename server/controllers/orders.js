const Order = require('../models/orders');
const User = require('../models/users');
const Product = require('../models/products');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        res.send(orders)
    } catch {
        res.status(404)
        res.send({ error: "Orders list is empty" })
    }
}

const getOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.find({ _id: id })
        await res.send(order)
    } catch {
        res.status(404)
        res.send({ error: "Can't find this order" })
    }
}

const getOrderAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await Order.find({ _id: id })
        res.send(order)
    } catch {
        res.status(404)
        res.send({ error: "Can't find this order" })
    }
}

const cancelOrderAdmin = async (req, res) => {

    const order = await Order.findOne({ _id: req.params.id });
    const { status, userId, orderNumber, cartValue } = req.body.params;

    try {

        if (Object.keys(order).length !== 0) {
            order.status = status;
            order.refunded = cartValue;

            if (userId) {
                const user = await User.findOne({ _id: userId });
                user.orderHistory = user.orderHistory.map(item => item.orderNumber === orderNumber ? { ...item, status: 'Cancelled', refunded: cartValue } : item)
                await user.save();
            }

            order.cart = order.cart.map(item => item = { ...item, refunded: item.quantity });

            order.cart.map(async item => {
                const product = await Product.findOne({ _id: item._id });
                product.totalStock = product.totalStock + item.quantity;
                await product.save();
            })

            await order.save()
            res.send(order)
        }

    } catch {
        res.status(404)
        res.send({ error: "Can't cancel this order" })
    }
}

const refundItemAdmin = async (req, res) => {

    const order = await Order.findOne({ _id: req.params.id });
    const { userId, orderNumber, itemId, cartValue } = req.body.params;

    try {

        if (Object.keys(order).length !== 0) {

            const refund = (item) => {

                order.refunded = order.refunded + item.price;

                if(order.refunded === cartValue){
                    order.status = 'Refunded';
                } else {
                    order.status = 'Partially refunded';
                }

                if(item.quantity > 1){

                    if(item.quantity !== item.refunded){
                        return item = { ...item, refunded: (item.refunded || 0) + 1} 
                    }

                } else {
                    return item = { ...item, refunded: 1 }
                }
            }

            order.cart = order.cart.map(item => item._id === itemId ? refund(item) : item);

            const updateStock = async (item) => {
                const product = await Product.findOne({ _id: item._id });
                product.totalStock = product.totalStock + item.quantity;
                await product.save();
            }

            order.cart.map(item => item._id === itemId ? updateStock(item) : item);

            await order.save();

            if (userId) {
                const user = await User.findOne({ _id: userId });
                user.orderHistory = user.orderHistory.map(item => item.orderNumber === orderNumber ? item = order : item)
                await user.save();
            }

            res.send(order);
        }

    } catch {
        res.status(404)
        res.send({ error: "Can't refund this item" })
    }
}

const createOrder = async (req, res) => {

    const newOrder = req.body.params.newOrder;
    const userType = req.body.params.userType;

    try {

        if (newOrder) {

            const orderConstructor = {
                cart: newOrder.cart,
                cartValue: newOrder.cartValue,
                refunded: newOrder.refunded,
                usedDiscounts: newOrder.usedDiscounts,
                discountsVal: newOrder.discountsVal,
                timestamp: newOrder.timestamp,
                orderNumber: newOrder.orderNumber,
                status: 'Placed'
            }

            const order = new Order({ ...orderConstructor, user: newOrder.user })
            await order.save()


            newOrder.cart.map(async item => {
                const product = await Product.findOne({ _id: item._id });
                product.totalStock = product.totalStock - item.quantity;
                await product.save();
            })

            if (userType === 'registered') {
                const user = await User.findOne({ _id: newOrder.user._id });
                user.orderHistory = [...user.orderHistory, { ...orderConstructor, _id: order._id }];
                await user.save();
                res.send(user);
            } else {
                res.sendStatus(200)
            }

        }


    } catch {
        res.send({ error: "Can't create this order" })
    }
}

module.exports = { getOrders, getOrder, getOrderAdmin, cancelOrderAdmin, refundItemAdmin, createOrder };