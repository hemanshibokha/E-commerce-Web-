const userSchema = require('../models/userSchema');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
passport.use(new passportLocal({
    usernameField : 'email'
}, async (email,password,done)=>{
    try{
        let user = await userSchema.findOne({email : email});
        console.log(user);
        if(!user || user.password != password){
            console.log("Enter valid password");
            return done(null,false);
        }
        else if(user.role == 'admin'){
            return done(null,user);
        }
        else {
            console.log("check role");
            return done(null,false);
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    userSchema.findById(id).then((user)=>{
        return done(null,user);
    }).catch((error)=>{
        console.log(error);
        return false;
    })
})

passport.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/');
}

passport.setAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.users = req.user;
    }
    return next();
}   

module.exports = passport;