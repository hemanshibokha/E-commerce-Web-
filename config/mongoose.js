const mongoose  = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/E-commerce(Web)');
const Database = mongoose.connection;
Database.on('connected',(error)=>{
    if(error){
        console.log(error);
        return false;
    }
    console.log("Database Connected");
})
module.exports=Database; 