const express = require("express");
const router = express.Router();

const admin = require("../../middleware/admin");

// @route   GET api/v1/trip
// @desc    Get trip
// @access  admin
router.get("/", admin, async (req, res) => {
  res.send("Get all trip 😄");
});

// @route   POST api/v1/trip
// @desc    Add trip
// @access  admin
router.post("/", admin, async (req, res) => {
  res.send("POST trip 😄");
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

module.exports = router;
