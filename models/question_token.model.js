const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const QuestionToken = new Schema(
  {
    id_question: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Question'
    },
    participant_answer: {
      type: String,
      required: true,
    },
    id_participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Participant'
    }
    
  },
  {
    versionKey: false
}
);

const QuestionTokensList = mongoose.model("QuestionToken", QuestionToken);
module.exports = QuestionTokensList;
