const Product = require("../models/product");


//User
exports.getList = (req,res,next)=>{
    
    Product.fetchAll()
    .then(prd =>{
    res.render(
            './user/list',
            {
                pageTitle: "📃 Lists",
                prdArray : prd,
                path : '/list',
            }
        )})
        .catch(
            err =>{
                console.log(err);
            } 
        );
};

exports.getProductDetail = (req,res,next)=>{
    
    const ProdID = req.params.ProdID;
    console.log(ProdID);
    Product.findById(ProdID)
    .then(product =>
        {
            console.log(product);
            res.render(
                './user/product-detail',
                {
                    pageTitle : "🕶 Product Detail",
                    path : "/product-detail",
                    product : product,
                }
            )
        })
}


exports.getOrder = (req,res,next) => {
    res.render(
        './user/order.ejs',
        {
            pageTitle : "💲 Orders",
            path : "/order"
        }
    )
}


//Admin
exports.getFormToNew = (req,res,next) =>
{
    res.render(
        './admin/edit-product',
        {
            pageTitle: '➕ Add-Product',
            path : '/admin/add-product',
            edit : false
        }
    )
};

exports.postAddNew = (req,res,next)=>
{
    const product = new Product
    (
        req.body.Name,
        req.body.price,
        req.body.desc,
        req.body.imgurl,
        null,
        req.user._id,
    )
    product.save()
    .then(result => {
        console.log(req.user._id,"=> This User Added New Prod !!");
        console.log("Added" + "\n" + result);
        res.redirect('/admin/products');
    })

    .catch(err => {
        console.log(err);
    });

};

exports.getEditProduct = (req, res,next) =>
{
    const editMode = req.query.edit;

    if (editMode !='true')
    {
        return res.redirect(
            '/'
        )
    }

    const prodID = req.params.ProdID;
    console.log(prodID);

    Product.findById(prodID).then(prod => {
        if(!prod)
        {
            return res.redirect('/')  
        }
        else
        {
            res.render(
                './admin/edit-product',
                {
                    pageTitle : '🖊 Edit Product',
                    path : "",
                    edit : editMode,
                    prod : prod
                },
               console.log(prod)
            )
        }
    })
    
}

exports.postEditProduct = (req,res,next) => 
{
   
    const updateProd = new Product(
        req.body.Name,
        req.body.price,
        req.body.desc,
        req.body.imgurl,
        req.body.prodId,
        req.body.user
        );

    updateProd.save().then(
        result => {
            console.log(result + '\n Updated Successfully');
            res.redirect('/admin/products');
        }
    )
    .catch(err => {
        console.log(err);
    });
    
}

exports.getProducts = (req,res,next) =>
{
        Product.fetchAll().then(prod =>{
            res.render(
                "./admin/products",
                {
                        pageTitle : "📝 Products",
                        path : "/admin/products",
                        prod : prod,
                    }
                )})
                .catch(err => {console.log(err)});
}

exports.postDelete = (req,res,next) => 
{
    const prodID = req.body.prodID;
    
    Product.deleteProdByID(prodID);
    res.redirect('/admin/products');
}