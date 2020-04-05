const expenseCtrl = {};

const Expense = require('../models/expences');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

expenseCtrl.getExpenses = async (req, res) => {
    const expenses = await Expense.find({id_investment: req.params.id});

    res.status(200).json({expenses});
}

expenseCtrl.createExpense = async (req, res) => {
    const {expense_name, description, amount, id_investment, email_user } = req.body;
    let result 
    try {
        result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'backend/expenses'});
        const newExpense = new Expense({expense_name, description, amount, id_investment, email_user, url_image: result.url, public_id: result.public_id});
        await newExpense.save();
        await fs.unlink(req.file.path);
    }catch (error) {
        await cloudinary.v2.uploader.destroy(result.public_id);
        await fs.unlink(req.file.path);
        return res.status(400).json({error})
    }

    res.status(200).json({message: "Expense saved"})
}

expenseCtrl.getExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id, (err, expense) =>{
        if(err){
            return res.send({error: err}) 
        }else if(!expense){
            return res.send({message: "Expense not exist"}) 
        }
    });
   
    res.status(200).json(expense);

}

expenseCtrl.updateExpense = async (req, res) => {
    const {expense_name, description, amount  } = req.body;  
    const expense = await Expense.findById(req.params.id);

    await cloudinary.v2.uploader.destroy(expense.public_id);

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'backend/expenses'});
        await Expense.findOneAndUpdate({_id: req.params.id }, {
            expense_name, description, amount, url_image: result.url, public_id: result.public_id
        });
        
        await fs.unlink(req.file.path);
    } catch (error) {
        await fs.unlink(req.file.path);
        return res.status(400).json({error})
    }

    res.status(200).json({message: "Expense updated"})
}

expenseCtrl.deleteExpense = async (req, res) => {
    const expense = await Expense.findById(req.params.id);
    

    try {
        await cloudinary.v2.uploader.destroy(expense.public_id);
        await Expense.findByIdAndDelete(req.params.id);
    } catch (error) {
        return res.status(400).json({error:error})
    }
    
    res.status(200).json({message: "Expense deleted"});
}

module.exports = expenseCtrl;