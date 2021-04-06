const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Trip } = require("../../models/Trips");
const { Station } = require("../../models/Station");

const _ = require("lodash");
const admin = require("../../middleware/admin");
const debug = require("debug")("app:routes");

const validateTripSearch = (query) => {
  const schema = {
    origin: Joi.string().min(5).max(50).required(),
    destination: Joi.string().min(5).max(50).required(),
    type_of_transport: Joi.string()
      .min(3)
      .max(10)
      .required()
      .allow("train", "bus"),
  };

  return Joi.validate(query, schema);
};

// @route   GET api/v1/trip
// @desc    Get trip
// @access  admin
router.get("/search", async (req, res) => {
  debug(req.query);
  const { error } = validateTripSearch(req.query);
  if (error) return res.status(400).json(error.details[0].message);
  const { origin, destination, type_of_transport } = req.query;

  const originTrip = await Station.findOne({ name: origin });
  if (!originTrip) return res.status(400).json({ message: "invalid origin" });
  const destinationTrip = await Station.findOne({ name: destination });
  if (!destinationTrip)
    return res.status(400).json({ message: "invalid destination" });

  const all_trips = await Trip.find({
    station: [originTrip._id, destinationTrip._id],
    type_of_transport,
  }).populate("station");

  res.json(all_trips);
});

// @route   GET api/v1/trip
// @desc    Get trip
// @access  admin
router.get("/", admin, async (req, res) => {
  const all_trips = await Trip.find().populate("station");
  res.json(all_trips);
});

// @route   POST api/v1/trip
// @desc    Add trip
// @access  admin
router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  const newTrip = new Trip(req.body);
  const savedTrip = await newTrip.save();
  return res.json({ trip: savedTrip });
});

// @route   PATCH api/v1/trip
// @desc    update trip
// @access  admin
router.patch("/update/:id", admin, async (req, res) => {
  const { id } = req.params;
  const update_values = req.body;
  const { error } = validate_update(update_values);
  if (error) return res.status(400).json(error.details[0].message);
  debug(update_values);
  const newTrip = await Trip.findByIdAndUpdate(id, update_values);
  res.json({ message: "trip updated", success: true });
});

// @route   DELETE api/v1/trip
// @desc    delete a trip
// @access  admin
router.delete("/delete", admin, async (req, res) => {
  const { trip_list } = req.body;
  const l = await Trip.deleteMany({ _id: { $in: trip_list } });
  debug(l);
  if (l.deletedCount === 0) return res.json({ success: false });
  return res.json({ message: "trips deleted", success: true });
});

// @route   GET api/v1/trip
// @desc    Get trip by id
// @access  admin
router.get("/:id", admin, async (req, res) => {
  const { id } = req.params;
  const trip = await Trip.findById(id).populate("station");
  res.json({ trip });
});

const validate = (req) => {
  const schema = {
    price: Joi.number().greater(0).required(),
    station: Joi.array().items(Joi.string().min(5).max(255).required()),
    depart_time: Joi.date().required(),
    arrival_time: Joi.date().required(),
    distance: Joi.number().greater(0).required(),
    type_of_transport: Joi.allow("train", "bus"),
  };
  return Joi.validate(req, schema);
};

const validate_update = (req) => {
  const schema = {
    price: Joi.number().greater(0),
    depart_time: Joi.date(),
    arrival_time: Joi.date(),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
