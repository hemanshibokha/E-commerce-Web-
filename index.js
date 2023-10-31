const express = require('express');
let port = 8080;
const app = express();
const path = require('path');
const database = require('./config/mongoose');
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
const passport = require('passport');
const passportLocal = require('./config/passport-Strargy');
const session = require('express-session');
app.use(session({
    name : 'hello',
    secret : 'Done',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000*60*60
    }
}))
app.use(express.urlencoded());
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use('/',require('./routes/indexroutes'));
app.listen(port,(error)=>{
    if(error){
        console.log(error);
        return false;
    }
    console.log("Server Connect "+port);
})