const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    category : {
        type : String,
        required : true
    }
})

const categoryRecord = mongoose.model('category',categorySchema);
module.exports = categoryRecord;