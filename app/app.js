const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

require('dotenv').config()

const con = require('../config/connection');

const port = process.env.PORT || 8080;
const logger = require('../config/logger')



app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())



const adminRoutes = require("../routes/admin");
const participantRoutes = require("../routes/participant")
const groupMembersRoutes = require("../routes/group_members")
const questionRoutes = require("../routes/question")
const roundRoutes = require("../routes/round")
const giftsRoutes = require("../routes/gifts")
const winnerRoutes = require("../routes/final_winner")

app.use('/admin', adminRoutes);
app.use('/participant', participantRoutes);
app.use('/group', groupMembersRoutes);
app.use('/question', questionRoutes);
app.use('/round', roundRoutes);
app.use('/gifts', giftsRoutes);
app.use('/winner', winnerRoutes);




module.exports =app;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }) 



