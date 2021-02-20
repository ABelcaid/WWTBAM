const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Round = new Schema(
  {
    id_group_members: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupMembers'
    },
    id_question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    },
    id_question_token: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionToken'
  },
    
  },
  {
    versionKey: false
}
);

const RoundList = mongoose.model("Round", Round);
module.exports = RoundList;
