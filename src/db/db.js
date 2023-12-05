const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://retrodroproyale:L5DY9R82L7qwr1rW@cluster0.hv2epfs.mongodb.net/users"
  )
  .then(() => {
    console.log("Connection successful");
  })
  .catch((e) => {
    console.log("e: ", e);
    console.log("no connection");
  });
