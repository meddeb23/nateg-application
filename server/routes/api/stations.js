const express = require("express");
const Joi = require("joi");
const router = express.Router();
const Station = require("../../models/Station");
const admin = require("../../middleware/admin");

// @route   GET api/v1/station
// @desc    Get Station
// @access  admin
router.get("/", admin, async (req, res) => {
  res.send("Get all Station 😄");
});

// @route   POST api/v1/station
// @desc    Add Station
// @access  admin
router.post("/", admin, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json(error);
  console.log(req.body);

  // const { } = req.body
  res.send("POST Station 😄");
});

// @route   PATCH api/v1/station
// @desc    update Station
// @access  admin
router.patch("/update/:id", admin, async (req, res) => {
  const { id } = req.params;
  res.send(`update Station with id = ${id} 😄`);
});

// @route   DELETE api/v1/station
// @desc    delete a Station
// @access  admin
router.delete("/delete", admin, async (req, res) => {
  const { station_list } = req.body;
  console.log(station_list);
  res.send("delete a Station 😄");
});

// @route   GET api/v1/station
// @desc    Get Station by id
// @access  admin
router.get("/:id", admin, async (req, res) => {
  const { id } = req.params;
  res.send(`get Station with id = ${id} 😄`);
});

const validate = (req) => {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    address: Joi.string().min(5).max(255).required(),
    location: Joi.object({
      type: Joi.string().min(5).max(255).required(),
      coordinates: Joi.array().items(Joi.number().greater(0).required()),
    }),
  };
  return Joi.validate(req, schema);
};

module.exports = router;
