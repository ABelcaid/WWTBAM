const express = require('express');
const router = express.Router();
const roundController = require('../controllers/round.controller')




router.post('/createRound/:idGroup', roundController.createRound);




module.exports = router;