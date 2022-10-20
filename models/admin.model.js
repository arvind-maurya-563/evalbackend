const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    position: String,
    contract:String,
    location:String,
    image:String,
    admin: mongoose.Schema.Types.ObjectId
});

const adminModel = mongoose.model("Jobprovider", adminSchema);
module.exports = adminModel;