const getdb = require('../utils/database').getDB;
const mongodb = require('mongodb');

class User{
    constructor(usname,mail,cart)
    {
        this.name = usname;
        this.mail = mail;
        this.cart = cart; //=> {items : []}
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
        /*const cartProd = this.cart.items.findIndex(
            cp => {
                return cp._id === product._id
            }
        )*/

        const updateCart = {items : [{...product._id,qty : 1}]}; 
//Here We Don't Store Complete Data We Just Store the ID so that when we make some change it should reflect at the Cart Too So we Will use the ID only
        const db = getdb();
        db.collection('users').updateOne(
            {
                _id : new mongodb.ObjectId(this._id)
            },
            {
                $set : {cart : updateCart}
            }
        )
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