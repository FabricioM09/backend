const investmentCtrl = {};

const Investment = require('../models/Investment');

investmentCtrl.getInvestments = async (req, res) => {
    const investments = await Investment.find();
    
    res.status(200).json({investments});
}

investmentCtrl.createInvestment = async (req, res) => {
    const {investment_name, description, email_user} = req.body;

    const newInvestment = new Investment({
        investment_name, description, email_user
    })

    if(!newInvestment.email_user[0]){
        return res.status(400).json({message: "email is required"})
    }

    try {
        await newInvestment.save();
    } catch (error) {
        return res.status(400).json({message: "not saved", error: error});
    }

    res.status(200).json({message: "Investment saved"});
}

investmentCtrl.getInvestment = async (req, res) => {
    
    const investment = await Investment.findById(req.params.id , (err, investment) =>{
        if(err){
            return res.send({error: err}) 
        }else if(!investment){
            return res.send({message: "Investment not exist"}) 
        }
    });
   
    res.status(200).json(investment);
}

investmentCtrl.updateInvestment = async (req, res) => {
    const {investment_name, description} = req.body;


    try {
        await Investment.findOneAndUpdate({_id: req.params.id}, {
            investment_name, description
        });
    } catch (error) {
        return res.status(400).json({message: "Not edited", error: error})
    }

    res.status(200).json({message: "Investment edited"})
}

investmentCtrl.deleteInvestment = async (req, res) => {
    
    try {
        await Investment.findByIdAndDelete(req.params.id);
    } catch (error) {
        return res.status(400).json({error:error})
    }
    
    res.status(200).json({message: "Investment deleted"});
}

module.exports = investmentCtrl;