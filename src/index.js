require("dotenv").config();
const initializeServer = require("./config/server.config");
const { generateDirectories } = require("./utils/generateDirectories");

//for generating uploads/ and subdirectories [imgs,docs,videos,others]
generateDirectories();

const port = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = require("./app");

initializeServer(app, port, MONGO_URI);
