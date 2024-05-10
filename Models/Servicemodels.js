const mongoose = require("mongoose");

// Define Schema for Service
const serviceSchema = new mongoose.Schema({
  name: {type: String,},
  description: {type: String,},
  category: { type: String,},
  price: {type: Number,},
  durationMinutes: {type: Number,},
  image: { type: String}
  // You can add more properties as needed
});

// Create model based on the service schema
const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
