const user = require('../models/user');
const Product = require('../models/product');

exports.getCart = (req, res, next) => {
  Cart.fetchAll(products => {

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
        return req.User.addToCart,
        console.log(
          prodID,"=> This is the ID of the Prod\n",
          prod,"=>this Prod add to Cart"
          );
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
  