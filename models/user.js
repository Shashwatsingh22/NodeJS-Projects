const getdb = require('../utils/database').getDB;
const mongodb = require('mongodb');

class User{
    constructor(usname,mail,cart,id)
    {
        this.name = usname;
        this.mail = mail;
        this.cart = cart; //=> {items : [{ prod._id , qty : 1}]}
        this._id = id;
    }

    save()
    {
       const db = getdb();
       
       return db.collection('user').insertOne(this)
       .then(result => 
        {
            console.log(result+ "\nUser Created");
        })
        .catch(err => 
            {
                console.log(err);
            })
    }

    addToCart(product)
    {
        //const cartIndex=-1;

        //if(this.cart!=null)
        //{
           const cartIndex = this.cart.items.findIndex(
                cp => {
                   return cp._id == product._id;
    //If we compare with changing to the String becoz there are of different type
    //We also compare by the help of two equal signs also.
               })
    // }
        console.log("Cart => ",cartIndex);

    let newQty=1;
    const updatedCartItems = [...this.cart.items];

    //If the Product is nOt Available then index will not be greater then Zero becoz mainly 
    //index start with 0 upto n,    
    if(cartIndex >= 0)
    {
       newQty = this.cart.items[cartIndex].qty+1;
       updatedCartItems[cartIndex].qty=newQty;
    }
    else
    {
      updatedCartItems.push({items : [{prodID : new mongodb.ObjectId(product._id),qty : newQty}]})
    }
        //console.log("Inside The Add to Cart",product._id)
//Here We Don't Store Complete Data We Just Store the ID so that
//when we make some change it should reflect at the Cart Too So we Will 
//use the ID only
//console.log("CartItems =>" ,updatedCartItems);

    const updateCart = {
        //items : [{prodID : new mongodb.ObjectId(product._id),qty : newQty}]
        items : updatedCartItems,
    };
    const db = getdb();

        //Now we will return with this UpdateOne Function 
        return db.collection('user').updateOne(
            {
                _id : new mongodb.ObjectId(this._id)
                //Here, We Are Finding that User And Then We Will Add this 
                //With there Data.
            },
            { $set : {
                    cart : updateCart,
                    //Here, We will update the Cart Section Here         
                }
            }
        )
    }

    fetchCart()
    {
        //return this.cart;
//Lets Return the Complete Product Detail
    const db = getdb();
    //Lest fetch out the prodid one by one
    const prodIDs = this.cart.items.map(i => {
        return i.prodID;
    })
    return db.collection('products').find({_id : { $in : prodIDs }})
    .toArray()
    .then(prod => {
        return prod.map(p=>
            {
                return {...p, qty: this.cart.items.find(
                    i=>{
                        return i.prodID.toString() === p._id.toString();
                    }
                ).qty
            }
            })
    }) 
    //Here we are using in which helps to traves to the array of the cart to capture the prodid
    //one by one.   
}

    static ufindById(uid)
    {
        const db = getdb();
        return db.collection('user').findOne({_id : new mongodb.ObjectId(uid)})
        .then(result =>
            {
               // console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = User;