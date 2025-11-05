const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../jwt");

async function getAllUsers(req, res) {
  try {
    const user = await User.find({});
    if (!user[0]) return res.json({ msg: "No users!" });
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
  }
}

async function findUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials!" });

    const accessToken = createToken(user);

    res.cookie("accessToken", accessToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true,
      secure: true,
      sameSite: "Strict"
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
  }
}

async function addUser(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields!" });
    }

    const hash = await bcrypt.hash(password, 7);
    await User.create({
      first_name,
      last_name,
      email,
      password: hash,
    });

    return res.status(201).json({ msg: "User registered successfully!" });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ msg: "User already exists!" });
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { getAllUsers, findUser, addUser };