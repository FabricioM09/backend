const { Router } = require('express');
const router = Router();

const {getIncomes, createIncome, getIncome , updateIncome, deleteIncome} = require('../controllers/incomes.controller');

router.route('/')
    .get(getIncomes)
    .post(createIncome)

router.route('/:id')
    .get(getIncome)
    .put(updateIncome)
    .delete(deleteIncome)

module.exports = router;