const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  beautyTips:{type: String,},
  description1: {type: String,},
  fitnessTips:  {type: String,},
  description2: {type: String,}
});

const Tip = mongoose.model('Tip', tipSchema);
module.exports = Tip;
