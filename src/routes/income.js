const { Router } = require('express');
const router = Router();

const {getIncomes, createIncome, getIncome , updateIncome, deleteIncome} = require('../controllers/incomes.controller');

router.route('/')
    .post(createIncome)

router.route('/allIncome/:id')
    .get(getIncomes)

router.route('/:id')
    .get(getIncome)
    .put(updateIncome)
    .delete(deleteIncome)

module.exports = router;