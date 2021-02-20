const jwt = require('jsonwebtoken');

const GroupMembers = require('../models/group_members.model');

const newGroup = (req, res) => {

        jwt.verify(req.token, 'belcaidKey', (err, authData) => {
                if(err) {
                        res.sendStatus(403);
                } else{

                    const GroupPush = new GroupMembers({
                
                        full_name: req.body.full_name,
                        phone: req.body.phone,
                        password: hashPassword

                });

                GroupPush
                        .save()
                        .then((data) => {
                                res.send(data);
                                res.json("Group successfully created")

                        }).catch((err) => res.status(400).json("Error :" + err));

                   

                }
        })



    






}


module.exports = {
    newGroup
};