const { Router } = require('express');
const router = Router();
const verifytoken = require('../helpers/verifyToker');

const {getExpenses, createExpense, getExpense , updateExpense, deleteExpense} = require('../controllers/expenses.controller');

router.route('/')
    .post(verifytoken, createExpense)

router.route('/allExpenses/:id')
    .get(verifytoken, getExpenses)

router.route('/:id' )
    .get(verifytoken,getExpense)
    .put(verifytoken,updateExpense)
    .delete(verifytoken,deleteExpense)

module.exports = router;