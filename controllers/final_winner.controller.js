const jwt = require('jsonwebtoken');
const FinalWinner = require('../models/final_winner.model');
const Gifts = require('../models/gifts.model');
const Round = require('../models/round.model');




const addFinalWinner = (req, res) => {

  jwt.verify(req.token, 'belcaidKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {

      let id_group_members = req.params.idGroup;

      (async () => {
        let round = await  getHighScore(id_group_members);
        let final_sccore = Math.max.apply(Math, round.map(function(round) { return round.score; }))

        let finalWinner = await winner(id_group_members, final_sccore);

        let gift = await getRandomGift()



        const FinalWinnerPush = new FinalWinner({

          id_group_members: id_group_members,
          final_sccore: final_sccore,
          id_participant: finalWinner,
          gift: gift,

        });

        FinalWinnerPush
          .save()
          .then((data) => {
            res.send(data);
            res.json("FinalWinner successfully added")

          }).catch((err) => res.status(400).json("Error :" + err));


      })()
    }
  });

}



async function getRandomGift() {

   gift =  await Gifts.find()
   let randomGift = gift[Math.floor(Math.random() * gift.length)];
   return randomGift._id;

 


}

async function getHighScore(id_group_members) {
  round = await Round.find({
    id_group_members: id_group_members
  })

  return round;



}

async function winner(id_group_members, final_sccore) {
  round = await Round.findOne({
      id_group_members: id_group_members,
      score: final_sccore
    })

    return round.id_participant;
}


module.exports = {
  addFinalWinner,
}