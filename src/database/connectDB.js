const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
     console.log(`Connected to ${con.connection.host}, ${con.connection.name}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
