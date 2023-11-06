const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    image : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    color : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    qty : {
        type : String,
        required : true
    },
    origin : {
        type : String,
        required : true
    },
    delivery : {
        type : String,
        required : true
    }
})

const productRecord = mongoose.model('product',productSchema);
module.exports = productRecord;