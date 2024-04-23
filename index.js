require("dotenv").config();
const express = require("express");
const db = require("./src/configs/db.config");

const app = express();
app.use("/", require("./src/routes"));

db.authenticate()
  .then(() => {
    console.log(`DB Connected . . .`);
  })
  .catch((err) => console.log({ err }));

app.listen(process.env.PORT || 5000, () => {
  console.log("server convert running");
});
