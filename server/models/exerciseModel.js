const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const exerciseSchema = new Schema({
    sentence:{
        type: String,
        required: true
    },
    author:{
        type:String,
        required:true
    }
    
},{timestamps:true})

module.exports =mongoose.model('exercise', exerciseSchema, 'exercise');