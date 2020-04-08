const { Router } = require('express');
const router = Router();
const verifytoken = require('../helpers/verifyToker');

const {getIncomes, createIncome, getIncome , updateIncome, deleteIncome} = require('../controllers/incomes.controller');

router.route('/')
    .post(verifytoken,createIncome)

router.route('/allIncome/:id')
    .get(verifytoken,getIncomes)

router.route('/:id')
    .get(verifytoken,getIncome)
    .put(verifytoken,updateIncome)
    .delete(verifytoken,deleteIncome)

module.exports = router;