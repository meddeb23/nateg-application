const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const error = require("../middleware/error");

const auth = require("../routes/api/auth");
const trip = require("../routes/api/trip");
const station = require("../routes/api/stations");
const user = require("../routes/api/user");

module.exports = (app) => {
  app.use(express.json());
  app.use(helmet());
  app.use(morgan("tiny"));
  app.use(cors());
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/station", station);
  app.use("/api/v1/trip", trip);

  app.use(error);
};
