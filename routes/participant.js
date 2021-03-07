const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participant.controller')
const auth = require('../middleware/auth')




router.post('/register' , participantController.register);
router.post('/login',participantController.login);
router.put('/validate/:id' , participantController.validate);
router.get('/all' , participantController.allParticipant);
router.get('/get/:idWinner', participantController.gerFinalWinner);


module.exports = router;