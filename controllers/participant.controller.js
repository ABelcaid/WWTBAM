const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Participant = require('../models/participant.model');
require('dotenv').config()
const Nexmo = require('nexmo');




const register = (req, res) => {

    bcrypt.hash(req.body.password, 10, function (err, hashPassword) {

        if (err) {
                res.json({
                        error: err
                })

        }

        const participantPush = new Participant({

                full_name: req.body.full_name,
                phone: req.body.phone,
                email: req.body.email,
                age: req.body.age,
                is_valid: false,
                online: false,
                password: hashPassword

        });

        participantPush
                .save()
                .then((data) => {
                        res.send(data);
                        res.json("participant successfully added")

                }).catch((err) => res.status(400).json("Error :" + err));

});

    



}

const login = (req, res) => {
        let phone = req.body.phone;
        let password = req.body.password;

        Participant.findOne({ phone: phone , is_valid: true })
                .then(participant => {
                        
                        if (participant) {
                                bcrypt.compare(password, participant.password, function (err, result) {
                                         if (err) {
                                                 res.json({error: err})

                                        }
                                        if (result) {
                                                let token = jwt.sign( {phone: phone }, 'belcaidKey', (err, token) => {
                                                        res.json({ token: token})
                                                })

                                
                                        } else {
                                                res.json({ message: 'phone or password err'})
                                        }

                                })


                        } else {
                                res.json({ message: 'participant not found or your acount is not valid'})
                        }


                }).catch((err) => res.status(400).json("Error :" + err));





}

const validate = (req , res)=>{



        Participant.findByIdAndUpdate(req.params.id  ,{
                is_valid: true
            }, 
            { useFindAndModify: false })
            .then(participant => {
                if(!participant) {
                    return res.status(404).send({
                        message: "participant not found with id " + req.params.id
                    });
                }
               

                const nexmo = new Nexmo({
                apiKey: process.env.APIKEY,
                apiSecret: process.env.APISECRET,
                });

                const from = 'Vonage APIs';
                const to = '212622157035';
                const text = 'congratulations your account has been activated';

                nexmo.message.sendSms(from, to, text);
                return res.status(200).send({
                        message: "participant  with id " + req.params.id + "is validate"
                    });
        }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "participant not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating participant with id " + req.params.id
                });
            });


}


const allParticipant = (req , res ) =>{
        Participant.find()
        .then((participant) => res.json(participant))
        .catch((err) => res.status(400).json("Error :" + err));
}



module.exports = {
        register ,login ,validate,allParticipant
};