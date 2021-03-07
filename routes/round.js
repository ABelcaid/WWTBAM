const express = require('express');
const router = express.Router();
const roundController = require('../controllers/round.controller')




router.post('/createRound/:idGroup', roundController.createRound);

router.get('/createRound/:idGroup', roundController.checkParticipantNumber);




module.exports = router;