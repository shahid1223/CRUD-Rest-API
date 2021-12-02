const mongoose = require('mongoose')
const {schema} = mongoose.Mongoose

const DataSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('data', DataSchema);