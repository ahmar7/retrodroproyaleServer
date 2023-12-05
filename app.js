const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotnet = require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
});
const newsLetterEmail = require("./models/newsletters");
const database = require("./db/db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
// parse application/json
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../../");
app.use(express.static(static_path));
app.post("/subscribeNewsetter", async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Fill all the fields" });
    }

    let emails = new newsLetterEmail({
      email: email,
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
app.get("/", async (req, res) => {
  res.send("live");
});
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
