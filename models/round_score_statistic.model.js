const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoundScoreStatistic = new Schema({
    id_round: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Round'
    },
    score: {
        type: Number,
        required: true,
    }

}, {
    versionKey: false
});

const RoundScoreStatisticList = mongoose.model("RoundScoreStatistic", RoundScoreStatistic);
module.exports = RoundScoreStatisticList;