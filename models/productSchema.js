const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    product : {
        type : String,
        required : true
    }
})

const productRecord = mongoose.model('product',productSchema);
module.exports = productRecord;