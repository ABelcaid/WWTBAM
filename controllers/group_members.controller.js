const jwt = require('jsonwebtoken');

const GroupMembers = require('../models/group_members.model');


function generateCode(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
}



const newGroup = (req, res) => {

        jwt.verify(req.token, 'belcaidKey', (err, authData) => {
                if(err) {
                        res.sendStatus(403);
                } else{

                    const GroupPush = new GroupMembers({
                
                        id_participant: [ req.body.id_participant ] ,
                        group_code: generateCode(4),
                        

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

const joinGroup = (req , res)=>{

        let group_code = req.params.codeGroup;
        let id_new_participant = req.body.id_new_participant;

        // check if group exist and there is less than 4 particpant 

        GroupMembers.findOne({group_code : group_code})
        .then(group => {
                if(!group) {
                    return res.status(404).send({
                        message: "group not found with id " + group_code
                    });            
                }
                if(group.id_participant.length > 3) {
                        return res.send({
                            message: "Ops the game is started !"
                        });            
                }
                

                GroupMembers.updateOne(
                        { group_code: group_code },
                        { $push: { id_participant: [id_new_participant] } },
                        function(err, result) {
                          if (err) {
                            res.send(err);
                          } else {
                            res.send(result);
                          }
                        }
                      )

            }).catch(err => {
               
                return res.status(500).send({
                    message: "Error retrieving group with id " + group_code
                });
            });

        

}



module.exports = {
    newGroup,joinGroup
};