const { Schema, model } = require('mongoose');

const incomeSchema = new Schema({
    income_name: {
        type: String,
        required: true,
    },
    description: String,
    url_image: String,
    amount: Number,
    id_investment: String,
    email_user:{
        type: String,
        required: true
    },
    public_id: String
},{
    timestamps: true  
})

module.exports =  model('Income', incomeSchema);