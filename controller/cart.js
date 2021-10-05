//const user = require('../models/user');
const Product = require('../models/product');
//const User = require('../models/user');

exports.getCart = (req, res, next) => {
  req.user.fetchAll(products => {
      res.render('./user/cart', {
        path: '/cart',
        pageTitle: '🛒 Cart',
        prd: products
      });
    });

};




exports.postCart = (req,res,next) => 
{
    const prodID = req.body.ProdID;

    Product.findById(prodID).then(prod => {
      //As here we can see that we are able call any function on the Fly due
      //to the help of that User Obeject
        return req.user.addToCart(prod),
        console.log(
          prodID,"=> This is the ID of the Prod\n",
          prod,"=>this Prod add to Cart"
          )
          //res.redirect('/cart')
        }).then(
        result => {
            console.log(result);       
        }
    )
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.findById(prodId, product => {
      Cart.deleteProduct(prodId, product.price);
      res.redirect('/cart');
    });
  };
  