//Modules
const express = require('express');
const parser = require('body-parser');
const path = require('path')

//Intiallization
const app = express();

//Routes
const admin = require('./routes/admin');
const user = require('./routes/user');

//Path
const rootDir = require('./utils/path');
const comController = require('./controller/home');

//DataBase
const mongoConnect = require('./utils/database').mongoConnect;

//Modles
//const u = require('./models/user');
const User = require('./models/user');

app.set('view engine','ejs');
app.set('views','views');

app.use(parser.urlencoded({
    extended:false
}));

app.use(express.static(path.join(__dirname,'public')));


app.use((req,res,next)=>
{
    User.ufindById('6154772da30bbce3e4986f7f')
    .then(result =>
        {
//Lets Create the User Obj So that we can call any function at the Runtime.            
            req.user = new User(result.name,result.mail,result.cart,result._id);
            //console.log(result._id);
            //result;
            //new user(result.name,result.mail,result.cart,result._id);
            //console.log(result);
            next();
        })
        .catch(err =>
            {
                console.log(err);
            })
})


app.use('/admin',admin);
app.use(user);
app.use(comController.get404);

mongoConnect(res => {

    app.listen(8000);
})


//module.exports = app;