const mongoose = require("mongoose");

const connection = async () => {
  try {
    // console.log("databaseconnected");
    mongoose.connect("mongodb+srv://arvind_maurya:arvind_194@cluster0.qxv1nzm.mongodb.net/?retryWrites=true&w=majority");
  } catch (error) {
    console.log(error);
  }
};

// const connection =

module.exports = connection;
