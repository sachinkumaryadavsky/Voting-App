const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
        
    },
    age:{
        type:Number,
        required:true,
        min:18

    },
    aadharnumber:{
        type:String,
        minLength:12,
        maxLength:12,
        required:true,
        unique:true

    },
    password:{
        type:String,
        minLength:5,
        required:true
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter',
        required:true,
    },
    isVoted:{
        type:Boolean,
        default:false

    }

});
const User = mongoose.model('User',userSchema);
module.exports = User;
