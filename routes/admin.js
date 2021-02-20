const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller')
const auth = require('../middleware/auth')



router.post('/add',  auth , adminController.addAdmin);
router.post('/login',adminController.loginAdmin);



module.exports = router;