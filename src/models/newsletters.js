const mongoose = require("mongoose");

let newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
});

const Email = new mongoose.model("Email", newsletterSchema);
module.exports = Email;
