const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/Todoapp")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

app.listen(3000, () => console.log(`Server running on port 3000`));
