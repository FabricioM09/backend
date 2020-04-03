const { Router } = require('express');
const router = Router();

const {getExpenses, createExpense, getExpense , updateExpense, deleteExpense} = require('../controllers/expenses.controller');

router.route('/')
    .get(getExpenses)
    .post(createExpense)

router.route('/:id')
    .get(getExpense)
    .put(updateExpense)
    .delete(deleteExpense)

module.exports = router;