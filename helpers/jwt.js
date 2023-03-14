const jwt = require("jsonwebtoken");
const SECRET = "HRISRTUV";

const createToken = (payload) => jwt.sign(payload, SECRET);
const verifyToken = (token) => jwt.verify(token, SECRET);

module.exports = { createToken, verifyToken };
