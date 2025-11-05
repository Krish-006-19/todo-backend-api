const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  findUser,
  addUser
} = require("../controllers/auth");

router.get('/',getAllUsers);
router.post('/register', addUser);
router.post('/login', findUser);

module.exports = router;
