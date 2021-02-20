const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const Admin = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
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

const AdminsList = mongoose.model("Admin", Admin);
module.exports = AdminsList;
