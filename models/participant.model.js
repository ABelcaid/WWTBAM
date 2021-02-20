const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Prticipant = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    is_valid: {
      type: Boolean,
      required: true,
    },
    online: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
    
  },
  {
    versionKey: false
}
);

const PrticipantsList = mongoose.model("Prticipant", Prticipant);
module.exports = PrticipantsList;
