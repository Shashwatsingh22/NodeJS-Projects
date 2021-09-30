const exp = require('constants');
const express = require('express')
const path = require('path');

const prodController = require('../controller/product');
const DirRoot = require('../utils/path')

const admin = express.Router();


admin.get('/add-product',prodController.getFormToNew);
   
admin.post('/added',prodController.postAddNew);

admin.get('/products',prodController.getProducts);

admin.get('/edit-product/:ProdID',prodController.getEditProduct);

admin.post('/edit',prodController.postEditProduct);

admin.post('/delete',prodController.postDelete);

module.exports=admin;