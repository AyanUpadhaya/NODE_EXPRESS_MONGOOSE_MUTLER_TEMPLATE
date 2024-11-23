const { generateHashPassword } = require("./bcryptTools");
const User = require("../models/userModel");

const firstAdminData = {
  username: process.env.FIRST_ADMIN_USERNAME,
  email: process.env.FIRST_ADMIN_EMAIL,
  role: "admin",
};

const createFirstAdmin = async () => {
  const user = await User.findOne({
    email: process.env.FIRST_ADMIN_EMAIL,
    role: "admin",
  });

  if (!user) {
    const password = await generateHashPassword(
      process.env.FIRST_ADMIN_PASSWORD
    );

    await User.create({ ...firstAdminData, password });
    console.log("First admin has been created");
  }
};

module.exports = createFirstAdmin;
