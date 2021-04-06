const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Trip } = require("../../models/Trips");
const { Station } = require("../../models/Station");
const admin = require("../../middleware/admin");
const { all } = require("./auth");

// @route   GET api/v1/trip
// @desc    Get trip
// @access  admin
router.get("/", admin, async (req, res) => {
  const all_trips = await Trip.find();

  let result = [];

  for (let trip of all_trips) {
    const full_station = trip.station.map(async (i) => {
      const t = await Station.findById(i);
      console.log(t);
      return t;
    });
    console.log(full_station);
    trip.station = full_station;
    console.log(trip, full_station);
    result.push(trip);
  }

  res.json(result);
});

// @route   POST api/v1/trip
// @desc    Add trip
// @access  admin
router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error);
  const newTrip = new Trip(req.body);
  const savedTrip = await newTrip.save();
  return res.json({ trip: savedTrip });
});

// @route   PATCH api/v1/trip
// @desc    update trip
// @access  admin
router.patch("/update/:id", admin, async (req, res) => {
  const { id } = req.params;
  res.send(`update trip with id = ${id} 😄`);
});

// @route   DELETE api/v1/trip
// @desc    delete a trip
// @access  admin
router.delete("/delete", admin, async (req, res) => {
  const { trip_list } = req.body;
  console.log(trip_list);
  res.send("delete a trip 😄");
});

// @route   GET api/v1/trip
// @desc    Get trip by id
// @access  admin
router.get("/:id", admin, async (req, res) => {
  const { id } = req.params;
  res.send(`get trip with id = ${id} 😄`);
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

module.exports = router;
