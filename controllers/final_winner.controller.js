const jwt = require('jsonwebtoken');
const FinalWinner = require('../models/final_winner.model');
const Gifts = require('../models/gifts.model');
const Round = require('../models/round.model');




const addFinalWinner = (req, res) => {

  jwt.verify(req.token, 'belcaidKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
        let id_group_members = req.body.id_group_members;
        let round = getHighScore(req.body.id_group_members);
        let final_sccore = Math.max(...round.score);


      const FinalWinnerPush = new FinalWinner({

        id_group_members:id_group_members,
        final_sccore: final_sccore,
        id_participant: winner(id_group_members,final_sccore),
        gift: getRandomGift(),
    
      });

      FinalWinnerPush
        .save()
        .then((data) => {
          res.send(data);
          res.json("FinalWinner successfully added")

        }).catch((err) => res.status(400).json("Error :" + err));

    }
  });

}



async function getRandomGift() {
    await Gifts.find()
    .then(gift => {
      let randomGift = gift[Math.floor(Math.random() * gift.length)];
        return randomGift._id;
    }).catch(err => {
      return null;
    });
  
    
}  

async function getHighScore(id_group_members) {
    await Round.findOne({id_group_members : id_group_members})
    .then(round => {

    return round ;
    }).catch(err => {
      return null;
    });
  
    
} 

async function winner(id_group_members,final_sccore){
    await Round.findOne({id_group_members : id_group_members , score : final_sccore})
    .then(round => {

    return round.id_participant;
    }).catch(err => {
      return null;
    });
}

 
module.exports = {
    addFinalWinner,
}