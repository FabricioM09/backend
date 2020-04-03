const { Router } = require('express');
const router = Router();

const { getInvestments,createInvestment, getInvestment, updateInvestment, deleteInvestment} = require('../controllers/investments.controller');

router.route('/')
    .get(getInvestments)
    .post(createInvestment)

router.route('/:id')
    .get(getInvestment)
    .put(updateInvestment)
    .delete(deleteInvestment)

module.exports = router;