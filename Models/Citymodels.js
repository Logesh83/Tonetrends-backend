const mongoose = require("mongoose");


const citySchema = new mongoose.Schema({
    name: {type: String},
    areas:{type: String,},
  });
  
  const City = mongoose.model('City', citySchema);
  
  module.exports = City;