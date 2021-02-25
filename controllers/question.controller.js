const jwt = require('jsonwebtoken');
const Question = require('../models/question.model');

const addQuestion = (req, res) => {

  jwt.verify(req.token, 'belcaidKey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {


      const QuestionPush = new Question({

        question: req.body.question,
        answer: req.body.answer,
        false_choices:req.body.false_choices,
        points: req.body.points,


      });

      QuestionPush
        .save()
        .then((data) => {
          res.send(data);
          res.json("Question successfully added")

        }).catch((err) => res.status(400).json("Error :" + err));

    }
  });

}

const getRandomQuestion = (req , res)=>{

  Question.find()
  .then(question => {
    let randomQuestion = question[Math.floor(Math.random() * question.length)];
      res.send(randomQuestion);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving question."
      });
  });


}


const getAllQuestion = (req , res) => {
  Question.find()
  .then((question) => res.json(question))
  .catch((err) => res.status(400).json("Error :" + err));
}

module.exports = {
  addQuestion,getRandomQuestion,getAllQuestion
}