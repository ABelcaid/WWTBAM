const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const GroupMembrs = new Schema(
  {
    id_participant:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Participant'
    }],
    group_code: {
      type: String,
      required: true,
    },
    used : {
      type : Boolean,
      default : false
    }
  },
  {
    versionKey: false
}
);

const GroupMembrssList = mongoose.model("GroupMembrs", GroupMembrs);
module.exports = GroupMembrssList;
