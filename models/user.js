const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
        required:true

    }
})

module.exports = mongoose.model('User',userScheme);