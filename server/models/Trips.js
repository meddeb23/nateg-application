const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  // name: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  //   maxlength: 50,
  // },
  price: {
    type: Number,
    required: true,
  },
  station: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Station", required: true },
  ],
  depart_date: {
    type: Date,
    required: true,
  },
  arrival_date: {
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
