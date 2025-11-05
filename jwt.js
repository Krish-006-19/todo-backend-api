const { sign, verify } = require("jsonwebtoken");

function createToken(user) {
<<<<<<< HEAD
  const accesstoken = sign({ id: user.id }, "Krish123");
=======
  const accesstoken = sign({ id: user.id }, "access-secret"),{ expiresIn: "1h" };
>>>>>>> e30e51ce382c4db29108a4cdbc2723e5f3282ac1
  return accesstoken;
}

async function verifyToken(req, res, next) {
  const token = req.cookies["accesstoken"];
  if (!token) return res.status(401).json({ msg: "Unauthorized access!" });
  try {
    const validToken = verify(token, "Enter your unique stuff");
    if (validToken) {
      req.user = validToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
}

module.exports = { createToken, verifyToken };
