const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group_members.controller')
const auth = require('../middleware/auth')



router.post('/newGroup',  auth , groupController.newGroup);




module.exports = router;