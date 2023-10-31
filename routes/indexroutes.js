const express = require('express');
const passport = require('passport');
const Routes = express.Router();

const adminConntroller = require('../controller/adminController');

Routes.get('/',adminConntroller.login);
Routes.get('/register',adminConntroller.register);
Routes.get('/admindashboard',passport.checkAuthentication,adminConntroller.admindashboard);
Routes.post('/registerData',adminConntroller.registerData);
Routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),adminConntroller.loginData);
Routes.get('/logout',adminConntroller.logout);
Routes.get('/myprofile',adminConntroller.myprofile);


module.exports = Routes; 