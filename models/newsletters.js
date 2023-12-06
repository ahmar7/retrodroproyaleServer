const mongoose = require("mongoose");

let newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Email = new mongoose.model("NewsLetterEmail", newsletterSchema);
module.exports = Email;
