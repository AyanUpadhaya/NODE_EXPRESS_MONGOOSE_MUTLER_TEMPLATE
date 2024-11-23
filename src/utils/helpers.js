//check missing property
const checkMissingProperty = async (obj) => {
  return Object.keys(obj).filter((key) => obj[key] === "");
};
//for sanitizing content contains html special chars
const sanitizeHtmlSpecialChars = (str) => {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return str.replace(/[&<>"']/g, (char) => map[char]);
};

//for email validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//for password validation
const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  checkMissingProperty,
  sanitizeHtmlSpecialChars,
  validateEmail,
  validatePassword,
};
