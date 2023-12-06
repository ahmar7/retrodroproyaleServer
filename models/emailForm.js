const mongoose = require("mongoose");

let contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  interests: [
    {
      type: String,
      required: true,
    },
  ],
  readiness: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const contactForm = new mongoose.model("contactForm", contactFormSchema);
module.exports = contactForm;
