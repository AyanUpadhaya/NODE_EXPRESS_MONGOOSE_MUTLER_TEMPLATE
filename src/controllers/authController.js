const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendResponse = require("../utils/sendResponse");
const {
  generateHashPassword,
  isPasswordMatch,
} = require("../utils/bcryptTools");
const { checkMissingProperty, validateEmail } = require("../utils/helpers");
//helpers

const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.SECRET_KEY,
    {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: "30d",
    }
  );
  return token;
};

//main controllers
const register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;

    const missedProps = checkMissingProperty({
      email,
      username,
      password,
      role,
    });
    if (missedProps && missedProps.length > 0) {
      return sendResponse(res, 400, { message: "Missing required props" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return sendResponse(res, 400, { message: "User already exist" });
    }

    const isEmailValidate = validateEmail(email);
    if (!isEmailValidate) {
      return sendResponse(res, 400, { message: "Email isn't validate" });
    }

    const hashPassword = await generateHashPassword(password);
    const newUser = new User({ email, username, password: hashPassword, role });
    await newUser.save();
    return sendResponse(res, 201, {
      message: `User created with username: ${username}`,
    });
  } catch (error) {
    sendResponse(res, 500, {
      message: `${error.message || "something went wrong"}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const missedProps = checkMissingProperty({
      username,
      password,
    });
    if (missedProps && missedProps.length > 0) {
      return sendResponse(res, 400, { message: "Missing required props" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return sendResponse(res, 404, { message: "User not found " });
    }
    const isMatch = await isPasswordMatch(password, user.password);
    //match password
    if (!isMatch) {
      return sendResponse(res, 400, {
        message: "Invalid username or password",
      });
    }
    const token = generateToken(user);

    return sendResponse(res, 200, {
      id: user._id,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    sendResponse(res, 500, {
      message: `${error.message || "something went wrong"}`,
    });
  }
};

module.exports = { login, register };
