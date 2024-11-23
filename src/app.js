const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { initializeMulter } = require("./config/multer.config");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const mainRouter = require("./routes/mainRouter");

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

//routes

app.use("/uploads", express.static("uploads"));
initializeMulter(app);
app.use(mainRouter);
//this code run when there is no route match
app.all("*", notFound);
//when we use next(err) it will go to error handling middleware and it will catch error and send response.

app.use(errorHandler);
module.exports = app;
