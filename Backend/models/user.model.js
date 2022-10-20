const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password:String,
  Jobs: [mongoose.Schema.Types.ObjectId]
});

const userModel = mongoose.model("Jobseekar", userSchema);
module.exports = userModel;
