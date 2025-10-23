const { sign, verify } = require("jsonwebtoken");

function createToken(user) {
  const accesstoken = sign({ id: user.id }, "Enter your unique stuff");
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
