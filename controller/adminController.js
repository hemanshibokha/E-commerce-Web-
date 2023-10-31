const userSchema = require('../models/userSchema');

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
    if(res.locals.users.role == 'admin'){
        return res.redirect('admindashboard');
    }
    else{
        return res.redirect('userdashboard');      
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

module.exports = {
    login,
    register,
    admindashboard,  
    userdashboard,
    registerData,
    loginData,
    logout,
    myprofile
}   