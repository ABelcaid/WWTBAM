const jwt = require('jsonwebtoken');
const Gifts = require('../models/gifts.model');

const addGifts = (req, res) => {

  jwt.verify(req.token, 'belcaidKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {


      const GiftsPush = new Gifts({

        name: req.body.name,
        image: req.body.image,
        


      });

      GiftsPush
        .save()
        .then((data) => {
          res.send(data);
          res.json("Gift successfully added")

        }).catch((err) => res.status(400).json("Error :" + err));

    }
  });

}

const getRandomGift = (req , res)=>{

    Gifts.find()
  .then(gift => {
    let randomGift = gift[Math.floor(Math.random() * gift.length)];
      res.send(randomGift);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Gift."
      });
  });


}


module.exports = {
    addGifts,getRandomGift
}