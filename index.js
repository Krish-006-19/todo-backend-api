require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const mongourl = process.env.MONGO_URL;

mongoose
  .connect(mongourl || "mongodb://127.0.0.1:27017/Todoapp")
  .then(() => console.log("Mongo connected!"))
  .catch((err) => console.error(err));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://frontend-todoapp1.netlify.app",
    "https://todofrontend-efk0.onrender.com"
  ],
  credentials: true
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/auth"));
app.use("/todo", require("./routes/todo"));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
