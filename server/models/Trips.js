const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  station: [{ type: Schema.Types.ObjectId, ref: "Station", required: true }],
  depart_time: {
    type: date,
    required: true,
  },
  arrival_time: {
    type: Date,
    required: true,
  },
  distance: {
    type: Number,
  },
  type_of_transport: {
    type: String,
    required: true,
  },
});

const Trip = mongoose.model("Trip", tripSchema);

module.exports = { Trip };
