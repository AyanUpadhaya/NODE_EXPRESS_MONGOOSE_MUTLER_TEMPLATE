const bcryptjs = require("bcryptjs");

const generateHashPassword = async (password) => {
  const hashPassword = await bcryptjs.hash(password, 10);
  return hashPassword;
};
const isPasswordMatch = async (password, userPassword) => {
  const isMatch = await bcryptjs.compare(password, userPassword);
  return isMatch;
};

module.exports = { generateHashPassword, isPasswordMatch };
