const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/Todoapp")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.error(err));

app.use(require("cors")({}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());

app.use("/", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

app.listen(3000, _ => console.log(`Server running on port 3000`));
