const { Schema, model } = require('mongoose');

const investmentSchema = new Schema({
    investment_name: {
        type: String,
        required: true,
    },
    description: String,
    email_user:{
        type: Array,
        required: true
    } 
    
},{
    timestamps: true  
})

module.exports =  model('Investment', investmentSchema);