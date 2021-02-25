const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Winner = new Schema({
    id_group_members: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupMembers'
    },
    id_participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant'
    },
    final_sccore: {
        type: Number,
    },
    gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gifts'
    },

}, {
    versionKey: false
})









const WinnerList = mongoose.model("Winner", Winner);
module.exports = WinnerList;