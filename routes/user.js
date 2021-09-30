const express = require('express');
const path = require('path');

const rootDir = require('../utils/path');
const Pdata = require('../routes/admin');

const prodController = require('../controller/product');
const cartController = require('../controller/cart');
const homeController = require('../controller/home');

const user = express.Router();

user.get('/',homeController.getHome);

user.get('/list',prodController.getList);

user.get('/cart',cartController.getCart);

user.post('/add-cart',cartController.postCart);

user.get('/product-detail/:ProdID',prodController.getProductDetail);

user.get('/order',prodController.getOrder);

module.exports=user;