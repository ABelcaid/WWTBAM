const express = require('express');
const router = express.Router();
const roundController = require('../controllers/round.controller')




router.post('/createRound', roundController.createRound);




module.exports = router;