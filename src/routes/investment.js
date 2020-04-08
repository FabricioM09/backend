const { Router } = require('express');
const router = Router();
const verifytoken = require('../helpers/verifyToker');
const { getInvestments,createInvestment, getInvestment, updateInvestment, deleteInvestment} = require('../controllers/investments.controller');

router.route('/')
    .get(verifytoken,getInvestments)
    .post(verifytoken,createInvestment)

router.route('/:id')
    .get(verifytoken,getInvestment)
    .put(verifytoken,updateInvestment)
    .delete(verifytoken,deleteInvestment)

module.exports = router;