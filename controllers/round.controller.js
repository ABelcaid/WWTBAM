const jwt = require('jsonwebtoken');

const Round = require('../models/round.model');
const GroupMembers = require('../models/group_members.model');
const Question = require('../models/question.model');



const createRound = async (req, res) => {

        // check if we have the group and we have  4 players 

        let id_group = req.params.idGroup;

        await GroupMembers.findById(id_group)
                .then(group => {
                        if (!group) {
                                res.json({ error: 'gtoup not found' });
                        }
                        if (group.id_participant.length < 3) {
                                res.json({ error: ' you need 4 players ... ' });
                             
                        }




                        let id_group_members = id_group;
                        let id_question = req.body.id_question;
                        let id_participant = req.body.id_participant;
                        let participant_answer = req.body.participant_answer;
                        // let score = checkParticipantScore(id_group,id_participant);
                        (async () => {
                                let score = await checkParticipantScore(id_group, id_participant);

                                console.log(score)

                                // console.log(score);

                                // check if the answer is correct then update score 
                                let a = await checkAnswer(participant_answer, id_question)

                                if (a == true) {
                                        score = score + 10;
                                        console.log(score);

                                }

                        console.log(a);
                            


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
                        })()
                }).catch(err => {

                        return res.status(500).send({
                                message: "Error retrieving group with id " + id_group
                        });
                });



}



const checkParticipantNumber = async (req, res) => {


        let id_group = req.params.idGroup;

        await GroupMembers.findById(id_group)
                .then(group => {
                        if (!group) {
                                res.json({ error: 'gtoup not found' });
                        }
                        if (group.id_participant.length < 3) {
                                res.json({ error: ' you need 4 players to start ... ' });
                             
                        }
                        res.send(group)
                }).catch(err => {

                        return res.status(500).send({
                                message: "Error retrieving group with id " + id_group
                        });
                });



}




async function checkAnswer(participant_answer, id_question) {

        // await Question.findById(id_question)
        //         .then(question => {
        //                 if (!question) {
        //                         return "question not found with id " + id_question
        //                 }
        //                 res.send(question);

        //                 if (question.answer == participant_answer) {

        //                         return true;

        //                 }
        //         }).catch(err => {
        //                 if (err.kind === 'ObjectId') {
        //                         return "question not found with id " + id_question
        //                 }
        //                 return "Error retrieving question with id " + id_question
        //         });



        question = await Question.findById(id_question)
        if (question.answer == participant_answer) {

                
                return true
                
        }else{
                return false
        }

}



// check if the paticipant has a score 

async function checkParticipantScore(id_group_members, id_participant) {
        let scoreArray = [0];
        round = await Round.find({
                id_group_members: id_group_members,
                id_participant: id_participant
        })

        if (round) {

                for (let i = 0; i < round.length; i++) {

                       scoreArray.push(round[i].score)
                        
                }

               

                return Math.max(...scoreArray)
                
        } else {
                return 0
                
        }
        

        




}




module.exports = {
        createRound,checkParticipantNumber
};