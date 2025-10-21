const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  findUser,
  addUser,
  deleteAll,
} = require("../controllers/auth");

router.route("/").get(getAllUsers).delete(deleteAll);
router.post('/register', addUser);
router.post('/login', findUser);

module.exports = router;