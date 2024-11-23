const crypto = require("crypto");

function generateRandomString(length = 32) {
  return crypto.randomBytes(length / 2).toString("hex"); // Divide length by 2 to get the desired character count
}

const randomString = generateRandomString();
console.log(randomString); // Example output: "4b9c21e4a8f4e0d8b60e29a3b4f54231"
