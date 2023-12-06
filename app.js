const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotnet = require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const newsLetterEmail = require("./models/newsletters");
const contactForm = require("./models/emailForm");
const database = require("./db/db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(
//   cors({
//     origin: process.env.CORS,
//     credentials: true,
//   })
// );
// parse application/json
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../../");
app.use(express.static(static_path));
app.post("/subscribeNewsetter", async (req, res) => {
  try {
    let { email } = req.body;
    let lowerEmail = email.toLowerCase();

    if (!lowerEmail) {
      return res
        .status(400)
        .send({ success: false, message: "Fill all the fields" });
    }
    const emailExist = await newsLetterEmail.findOne({
      email: lowerEmail,
    });
    console.log(emailExist, "exist");
    if (emailExist) {
      return res.status(200).send({ message: "Done", success: true });
    }

    let emails = new newsLetterEmail({
      email: lowerEmail,
    });
    console.log(emails);
    await emails.save();
    res.status(200).send({ message: "Done", success: true });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
    console.log(e);
  }
});
app.post("/submitContactForm", async (req, res) => {
  try {
    let { name, email, message, interests, readiness } = req.body;

    if (!email || !name || !message || !interests || !readiness) {
      return res
        .status(400)
        .send({ success: false, message: "Fill all the fields" });
    }
    console.log(req.body);
    let submitForm = new contactForm({
      name: name,

      email: email.toLowerCase(),
      message: message,
      interests: interests,
      readiness: readiness,
    });
    await submitForm.save();
    res.status(200).send({ message: "Done", success: true });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
    console.log(e);
  }
});
app.get("/deleteAllSubscribeNewsetter", async (req, res) => {
  try {
    let deletes = await newsLetterEmail.deleteMany();
    console.log(deletes);
    res.status(200).send({ message: "Done", success: true });
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
    console.log(e);
  }
});
app.get("/allSubscribeNewsetter", async (req, res) => {
  try {
    let allNewsletter = await newsLetterEmail.find();

    res.send(allNewsletter);
  } catch (e) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
    console.log(e);
  }
});
app.get("/", async (req, res) => {
  res.send("live");
});
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
