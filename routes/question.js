const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller')
const auth = require('../middleware/auth')




router.post('/addQuestion',auth , questionController.addQuestion);

router.get('/getQuestion', questionController.getRandomQuestion);

router.get('/getQuestion/all', questionController.getAllQuestion);
module.exports = router;