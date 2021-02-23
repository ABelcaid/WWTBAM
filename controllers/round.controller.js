const jwt = require('jsonwebtoken');

const Round = require('../models/round.model');
const GroupMembers = require('../models/group_members.model');
const Question = require('../models/question.model');



 const createRound = async (req, res) => {

        // check if we have the group and we have  4 players 

        let id_group = req.params.id_group;

        await GroupMembers.findById(id_group)
                .then(group => {
                        if (!group) {
                                return res.status(404).send({
                                        message: "group not found with id " + id_group
                                });
                        }
                        if (group.id_participant.length < 3) {
                                return res.send({
                                        message: "Ops you need 4 players to start the game  !"
                                });
                        }


                        let id_group_members = req.body.id_group_members;
                        let id_question = req.body.id_question;
                        let id_participant = req.body.id_participant;
                        let participant_answer = req.body.participant_answer;
                        let score = 0;

                        // check if the answer is correct then update score 
                        if (checkAnswer(participant_answer, id_question)) {
                                score = 10;

                        }

                        const RoundPush = new Round({

                                id_group_members: id_group_members,
                                id_question: id_question,
                                id_participant: id_participant,
                                participant_answer: participant_answer,
                                score: score,


                        });

                        RoundPush
                                .save()
                                .then((data) => {
                                        res.send(data);
                                        res.json("Round  successfully saved")

                                }).catch((err) => res.status(400).json("Error :" + err));

                }).catch(err => {

                        return res.status(500).send({
                                message: "Error retrieving group with id " + id_group
                        });
                });



}


async function checkAnswer(participant_answer, id_question) {

        await Question.findById(id_question)
                .then(question => {
                        if (!question) {
                                return "question not found with id " + id_question
                        }
                        res.send(question);

                        if (question.answer == participant_answer) {

                                return true;

                        }
                }).catch(err => {
                        if (err.kind === 'ObjectId') {
                                return "question not found with id " + id_question
                        }
                        return "Error retrieving question with id " + id_question
                });



}




module.exports = {
        createRound
};