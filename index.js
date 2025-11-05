require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const mongourl = process.env.MONGO_URL;

mongoose
  .connect(mongourl || "mongodb://127.0.0.1:27017/Todoapp")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.error(err));

<<<<<<< HEAD
app.use(cors({
=======
// app.use(require("cors")({}));

app.use(require("cors")({
>>>>>>> e30e51ce382c4db29108a4cdbc2723e5f3282ac1
  origin: [
    "http://localhost:5173",
    "https://todoapp-0345.netlify.app"
  ],
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());

app.use("/", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

<<<<<<< HEAD
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
=======
app.listen(3000, _ => console.log(`Server running on port 3000`));
>>>>>>> e30e51ce382c4db29108a4cdbc2723e5f3282ac1
