const getDB = require('../utils/database').getDB;
const mongoDB = require('mongodb');

class Product {
  constructor(title,price,desc,imgurl,id,uid)
  {
    this.title = title;
    this.price = price;
    this.desc = desc;
    this.imgurl = imgurl;
    this._id = id ? new mongoDB.ObjectId(id) : null;
    this.uid = uid;
  }

  save()
  {
      const db = getDB();
      let dbOP;
      let bool;
      console.log("Check = ", this._id);
      if(this._id)
      {
        bool=0;
        dbOP = db.collection('products').updateOne({_id : this._id},{ $set: this})
      }
      else
      {
        bool=1;
       dbOP = db.collection('products').insertOne(this) 
      }
    return dbOP.then(result => {
      console.log(result);
      if(bool)
      {
        console.log("Added");
      }
      else
      {
        console.log("Updated");
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  static fetchAll()
  {
    const db = getDB();
    return db.collection('products').find().toArray()
    .then(prod => {
      //console.log(prod);
      return prod;
    })
    .catch(err => {
      console.log(err);
    });
  
  }

  static findById(prodId)
  {
    const db = getDB();
    console.log(db);
     return db.collection('products')
     .find({_id : mongoDB.ObjectId(prodId)})
     .next()//Becoz We Wants To Take Currsor from the Find Location
     .then(prod => 
      {
       console.log(prod);
        return prod;
      })
      .catch(err => {
        console.log(err);
      })
  }

  static deleteProdByID(prodId)
  {
    const db = getDB();
    return db.collection('products').deleteOne({_id : new mongoDB.ObjectId(prodId)})
    .then(result => {
      console.log(result + "\n Deleted");
    })
    .catch(err => 
      {
        console.log(err);
      })
  }
}

module.exports = Product;