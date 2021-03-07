const express = require('express');
const router = express.Router();
const finalWinnerController = require('../controllers/final_winner.controller')




router.post('/add/:idGroup', finalWinnerController.addFinalWinner);




module.exports = router;