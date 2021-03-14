const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");

const user = require("../routes/api/user");
const auth = require("../routes/api/auth");

module.exports = (app) => {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use(cors());
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);

  app.use(error);
};
