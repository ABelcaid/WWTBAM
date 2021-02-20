const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const FinalWinner = new Schema(
  {
    id_round:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Round'
    }] ,
    final_score: {
      type: Number,
      required: true,
    },
    id_participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Participant'
    },
    id_gift: {
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Gifts'
    },
  
    
    
  },
  {
    versionKey: false
}
);

const FinalWinnersList = mongoose.model("FinalWinner", FinalWinner);
module.exports = FinalWinnersList;
