const express = require('express');
const router = express.Router();
const finalWinnerController = require('../controllers/final_winner.controller')
const auth = require('../middleware/auth')



router.post('/add/:idGroup',auth , finalWinnerController.addFinalWinner);




module.exports = router;