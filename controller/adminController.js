const userSchema = require('../models/userSchema');
const categorySchema = require('../models/categorySchema');
const productSchema = require('../models/productSchema');

const login = (req,res) => {
    if(res.locals.users){
        return res.redirect('/admindashboard');
    }
    return res.render('login')
}   

const register = (req,res) => {
    return res.render('register')
} 

const admindashboard = (req,res) => {
    return res.render('admin/admindashboard'); 
}

const userdashboard = (req,res) => {
    return res.render('user/userdashboard'); 
}

const registerData = async (req,res) => {
    try{
        const{name,email,password,cpassword} = req.body;
        if(password == cpassword){
            let userInsert = await userSchema.create({
                name : name,
                email : email,
                password : password
            }) 
            if(userInsert){
                console.log("User Registered");
                return res.redirect('back');
            }
            else{
                console.log("User not Registered");
                return res.redirect('back');
            }
        }
        console.log("Password and Confirm password are same");
    }
    catch(error){
        console.log(error);
        return false;
    }   
}

const loginData = (req,res) => {
    if(req.isAuthenticated()){
        if(req.user.role == 'admin'){
            return res.redirect('admindashboard');
        }
        else{
            return res.redirect('userdashboard');      
        }
    }
    else{
        return res.redirect('/');
    }
}

const logout = async (req,res) => {
    try{
        req.logOut((error)=>{
            if(error){
                console.log(error);
                return false;
            }
            return res.redirect('/');
        })
    }
    catch(error){
        console.log(error); 
        return false;
    }
}

const myprofile = (req,res) => {
    return res.render('myprofile')
}

const addcategory = (req,res) => {
    return res.render('addcategory');
}

const shop = async (req,res) => {
    try{
        let user = res.locals.users;
        let viewData = await categorySchema.find({});
        let productData = await productSchema.find({});
        return res.render('shop',{
            viewData,
            user,
            productData
        }); 
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const shopfilter = async(req,res) => {
    try{
        let category = req.params.category;
        let categoryfilter = await productSchema.find({categoryId : category});
        if(categoryfilter){
            return res.json(categoryfilter);
        }else{
            return res.json({messege : "Filter not Found"})
        }

    }catch(err){
        console.log(err);
        return false;
    }
    
}

const addCategoryData = async (req,res) => {
    try{
        let categoryInsert = await categorySchema.create({
            category : req.body.category
        })
        if(categoryInsert){
            console.log("Category Insert");
            return res.redirect('back');
        }
        else{
            console.log("Category Not Insert");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const addproduct = async (req,res) => {
    try{
        let productRecord = await categorySchema.find({});
        if(productRecord){
            return res.render('addproduct',{
                productRecord
            });
        }
        else{
            console.log('category not shown');
        }
        
    }
    catch(error){
        console.log(error);
        return false;
    }
}

const addproductData = async (req,res) => {
    try{
        const {category,product} = req.body;
        let addproduct = await productSchema.create({
            categoryId : category,
            product : product 
        })
        if(addproduct){
            console.log("product Insert");
            return res.redirect('back');
        }
        else{
            console.log("product Not Insert");
            return res.redirect('back');
        }
    }
    catch(error){
        console.log(error);
        return false;
    }
}
 
module.exports = {
    login,
    register,
    admindashboard,  
    userdashboard,
    registerData,
    loginData,
    logout,
    myprofile,
    addcategory,
    shop,
    addCategoryData,
    addproduct,
    addproductData,
    shopfilter
}   