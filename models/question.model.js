const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Question = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  false_choices: {
    type: Array,
    required: true
  },
  points: {
    type: Number,
    required: true
  },

},
{
  versionKey: false
})









const QuestionList = mongoose.model("Question", Question);
module.exports = QuestionList;