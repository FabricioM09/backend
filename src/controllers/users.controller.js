const userCtrl = {};

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const moment = require('moment');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userCtrl.createUser = async (req, res) => {
    const {username} = req.body;
    const newUser = new User({username});
    await newUser.save( function(error)  {
        if(error){
            res.json({"error":"Error al intentar guardar el User"});
         }else{ 
            res.json({"message": "User created"});
         }
    });
    
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: 'User Deleted'});
}

userCtrl.loginUser = async (req, res) => {
    const {email, password } = req.body;
    
    const user = await User.findOne({email});
    
    if(!user){
        return res.send({
            "message": "The email doesn't exists",
            "status" : 404
        }) 
    }

    const validPassword = await user.validatePassword(password);
    if(!validPassword){

        return res.status(401).json({auth: false, token: null, message: "Invalid password"});
    }

    const token = jwt.sign({id: user._id}, process.env.mykeysecret, {
        expiresIn: moment().add(14, 'days').unix() 
    }) 

    res.json({auth: true, token});
}

userCtrl.registerUser = async (req, res) => {
    const { username, email, password } = await req.body;
    const user = new User({
        username,
        email,
        password
    }); 
    
    try {
        user.password = await user.encryptPassword(user.password);
    
        await user.save();
    } catch (error) {
        return res.json({
            "error": error.errmsg,
            "code": error.code})
    }
    

    const token =  jwt.sign({id: user._id}, process.env.mykeysecret, {
        expiresIn:  moment().add(14, 'days').unix()
    });
    
    res.json({auth: true, token});
}

module.exports = userCtrl;