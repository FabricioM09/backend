const incomeCtrl = {};

const Income = require('../models/income');

const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const fs = require('fs-extra');

incomeCtrl.createIncome = async (req, res) => {
    const {income_name, description, amount, id_investment, email_user } = req.body;
    
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'backend/income'});
        const newIncome = new Income({income_name, description, amount, id_investment, email_user, url_image: result.url, public_id: result.public_id});
        await newIncome.save();
        await fs.unlink(req.file.path);
    }catch (error) {
        await fs.unlink(req.file.path);
        return res.status(400).json({error})
    }

    res.status(200).json({message: "Income saved"})
}

incomeCtrl.getIncomes = async (req, res) => {
    const income = await Income.find({id_investment: req.params.id});

    res.status(200).json({income});
}

incomeCtrl.getIncome = async (req, res) => {
    const income = await Income.findById(req.params.id , (err, income) =>{
        if(err){
            return res.send({error: err}) 
        }else if(!income){
            return res.send({message: "Income not exist"}) 
        }
    });
   
    res.status(200).json(income);

}

incomeCtrl.updateIncome = async (req, res) => {
    const {income_name, description, amount  } = req.body;  
    const income = await Income.findById(req.params.id);

    await cloudinary.v2.uploader.destroy(income.public_id);

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {folder: 'backend/income'});
        await Income.findOneAndUpdate({_id: req.params.id }, {
            income_name, description, amount, url_image: result.url, public_id: result.public_id
        });
        
        await fs.unlink(req.file.path);
    } catch (error) {
        await fs.unlink(req.file.path);
        return res.status(400).json({error})
    }

    res.status(200).json({message: "Income updated"})
}

incomeCtrl.deleteIncome = async (req, res) => {
    const income = await Income.findById(req.params.id);
    

    try {
        await cloudinary.v2.uploader.destroy(income.public_id);
        await Income.findByIdAndDelete(req.params.id);
    } catch (error) {
        return res.status(400).json({error:error})
    }
    
    res.status(200).json({message: "Income deleted"});
}



module.exports = incomeCtrl;