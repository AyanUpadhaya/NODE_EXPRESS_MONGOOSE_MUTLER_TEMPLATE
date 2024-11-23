const connectDB = require("../database/connectDB");
const createFirstAdmin = require("../utils/createFirstAdmin");

async function initializeServer(app, port, MONGO_URI) {
  try {
    app.listen(port, () => console.log(`Server running on port ${port}`));
    await connectDB();
    await createFirstAdmin();
  } catch (error) {
    console.log("Error starting the server: ", error);
    process.exit(1);
  }
}

module.exports = initializeServer;
