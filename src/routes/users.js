const { Router } = require('express');
const router = Router();

const { getUsers, createUser, deleteUser, loginUser, registerUser} = require('../controllers/users.controller');


router.route('/')
    .get(getUsers)
    .post(createUser)
   
router.route('/:id')
    .delete(deleteUser)

router.route('/login')
    .post(loginUser)

router.route('/register')
    .post(registerUser)

module.exports = router;