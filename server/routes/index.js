const express = require("express");
const router = express.Router();
const userController = require('../controllers/users');
const productsController = require('../controllers/products');
const authController = require('../controllers/auth');
const orderController = require('../controllers/orders');
const discountController = require('../controllers/discounts');
const messagesController = require('../controllers/messages');

router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserAdmin);
router.get('/user', userController.getUser);
router.post('/user', userController.addUser);
router.patch('/user/edit/:id', userController.updateUserAdmin);
router.patch('/users/:id', userController.updateUser);
router.delete('/users/delete', userController.deleteUser);

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);
router.post('/product', productsController.addProductAdmin);
router.patch('/products/edit/:id', productsController.updateProductAdmin);
router.patch('/products/index/:id', productsController.updateProductIndexAdmin);
router.patch('/products/clone/:id', productsController.cloneProductAdmin);
router.delete('/products/delete', productsController.deleteProductAdmin);

router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrder);
router.get('/order/:id', orderController.getOrderAdmin);
router.post('/orders', orderController.createOrder);
router.patch('/order/cancel/:id', orderController.cancelOrderAdmin);
router.patch('/order/refund/item/:id', orderController.refundItemAdmin);

router.get('/discounts', discountController.getDiscounts);
router.get('/discount/:id', discountController.getDiscountAdmin);
router.post('/discounts', discountController.addDiscountAdmin);
router.patch('/discount/edit/:id', discountController.updateDiscountAdmin);
router.delete('/discounts/delete', discountController.deleteDiscountAdmin);

router.get('/messages', messagesController.getMessagesAdmin);
router.get('/messages/:id', messagesController.getMessageAdmin);
router.post('/messages', messagesController.addMessageAdmin);
router.patch('/message/edit/:id', messagesController.updateMessageAdmin);
router.delete('/messages/delete', messagesController.deleteMessageAdmin);

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/auth', authController.auth);

module.exports = router;

