const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {getUsers, createUser, getUserByAccountNumber, getUserByIdentityNumber, updateUser, deleteUser} = require('../controllers/user_controller');
const {cacheByAccountNumber, cacheByIdentityNumber} = require('../controllers/cache_controller');

router.get('/', auth, getUsers);
router.post('/', createUser)
router.get('/accountNumber/:id',auth, cacheByAccountNumber, getUserByAccountNumber)
router.get('/identityNumber/:id', auth, cacheByIdentityNumber, getUserByIdentityNumber)
router.put('/:id', auth, updateUser)
router.delete('/:id', auth, deleteUser)

module.exports = router 