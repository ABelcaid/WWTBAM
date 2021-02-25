const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');

const addAdmin = (req, res) => {

        jwt.verify(req.token, 'belcaidKey', (err, authData) => {
                if(err) {
                        res.sendStatus(403);
                } else{

                        bcrypt.hash(req.body.password, 10, function (err, hashPassword) {

                                if (err) {
                                        res.json({
                                                error: err
                                        })
                
                                }
                
                                const AdminPush = new Admin({
                
                                        full_name: req.body.full_name,
                                        phone: req.body.phone,
                                        password: hashPassword
                
                                });
                
                                AdminPush
                                        .save()
                                        .then((data) => {
                                                res.send(data);
                                                res.json("Admin successfully added")
                
                                        }).catch((err) => res.status(400).json("Error :" + err));
                
                        });

                }
        })



    






}

const loginAdmin = (req, res) => {
        let phone = req.body.phone;
        let password = req.body.password;

        Admin.findOne({ phone: phone })
                .then(admin => {
                        
                        if (admin) {
                                bcrypt.compare(password, admin.password, function (err, result) {
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
                                res.json({ message: 'admin not found'})
                        }


                }).catch((err) => res.status(400).json("Error :" + err));





}


const getAllAdmins = (req , res) => {
        Admin.find()
        .then((admin) => res.json(admin))
        .catch((err) => res.status(400).json("Error :" + err));
}




module.exports = {
        addAdmin ,loginAdmin,getAllAdmins
};