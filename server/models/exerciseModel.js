const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const exerciseSchema = new Schema({
    title:{
        type: String
    },
    sentence:{
        type: String,
        required: true
    },
    author:{
        type:String,
        required:true
    },
    breakfast:{
        type: String
    },
    approved:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

module.exports =mongoose.model('exercise', exerciseSchema, 'exercise');