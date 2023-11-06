const express = require('express');
const passport = require('passport');
const Routes = express.Router();

const multer = require('multer');
const file = multer.diskStorage({
    destination : (req,res,cb) => {
        cb(null,'uploads/');
    },
    filename : (req,res,cb)=>{
        cb(null, file.originalname)
    }
})

const imageUploads = multer({storage : file}).single('image');

const adminConntroller = require('../controller/adminController');

Routes.get('/',adminConntroller.login);
Routes.get('/register',adminConntroller.register);
Routes.get('/admindashboard',passport.checkAuthentication,adminConntroller.admindashboard);
Routes.get('/userdashboard',passport.checkAuthentication,adminConntroller.userdashboard);
Routes.post('/registerData',adminConntroller.registerData);
Routes.post('/loginData',passport.authenticate('local',{failureRedirect : '/'}),adminConntroller.loginData);
Routes.get('/logout',adminConntroller.logout); 
Routes.get('/myprofile',adminConntroller.myprofile);
Routes.get('/addcategory',adminConntroller.addcategory);
Routes.get('/shop',adminConntroller.shop);
Routes.post('/addCategoryData',adminConntroller.addCategoryData); 
Routes.get('/addproduct',adminConntroller.addproduct);
Routes.post('/addproductData',imageUploads,adminConntroller.addproductData);

module.exports = Routes; 