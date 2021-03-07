const express = require('express');
const router = express.Router();
const giftsController = require('../controllers/gifts.controller')
const auth = require('../middleware/auth')




router.post('/addGift',auth , giftsController.addGifts);
router.get('/getGift/:giftId', giftsController.getGift);



module.exports = router;