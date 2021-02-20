const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const GroupMembrs = new Schema(
  {
    id_participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Participant'
    },
    grope_code: {
      type: String,
      required: true,
    }
  },
  {
    versionKey: false
}
);

const GroupMembrssList = mongoose.model("GroupMembrs", GroupMembrs);
module.exports = GroupMembrssList;
