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




module.exports = {
    addGifts
}