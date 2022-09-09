const { object, string } = require("yup");

const auth = object().shape({
  username: string().required().max(30).trim().lowercase(),
  password: string().required().max(40),
});

module.exports = { auth };
