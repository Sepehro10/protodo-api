const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../utils/certs");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getRandom = (length) =>
  Math.floor(
    Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)
  );

const hashPassword = async (password, saltRounds = 10) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedString = await bcrypt.hash(password, salt);
  return hashedString;
};

const validatePassword = (givenPassword, hash) => {
  return bcrypt.compareSync(givenPassword, hash);
};

const generateSession = async (jwtPayload) => {
  const accessToken = jwt.sign(
    jwtPayload,
    Buffer.from(config.privateKey, "utf8"),
    { expiresIn: "7d", algorithm: "RS256" }
  );
  return accessToken;
};

const removeFields = (obj, keys) => {
  for (const key of keys) delete obj[key];
  return obj;
};

module.exports = {
  getRandom,
  hashPassword,
  validatePassword,
  generateSession,
  removeFields,
};
