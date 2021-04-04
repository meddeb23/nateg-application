const express = require("express");
const router = express.Router();

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

module.exports = router;
