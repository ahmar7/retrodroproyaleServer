const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotnet = require("dotenv");
const newsLetterEmail = require("./models/newsletters");
const database = require("./db/db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  })
);
// parse application/json
app.use(bodyParser.json());
dotnet.config({ path: "./config.env" });
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
app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
