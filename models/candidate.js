const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
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
    party:{
        type:String,
        required:true
    },
    photo:{

        type:Buffer,
        require:true
    },
    voteCount:{
        type:Number,
        default:0
    },
    votes:[
        {
            user:{
                  type:mongoose.Schema.Types.ObjectId,
                  ref:'User',
                  required:true
            },
            votedAt:{
                type:Date,
                default:Date.now
            }
        }
    ]

});
const Candidate = mongoose.model('Candidate',candidateSchema);
module.exports =Candidate;
