const { sign, verify } = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function createToken(user) {
  // Token payload contains the user id; sign with secret and set an expiry
  const accesstoken = sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });
  return accesstoken;
}

async function verifyToken(req, res, next) {
  const token = req.cookies["accessToken"];
  if (!token) return res.status(401).json({ msg: "Unauthorized access!" });
  try {
    const validToken = verify(token, JWT_SECRET);
    if (validToken) {
      req.user = validToken;
      next();
    }
  } catch (error) {
    return res.status(401).json({ msg: error.message });
  }
}

module.exports = { createToken, verifyToken };
