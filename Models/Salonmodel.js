const mongoose = require("mongoose");

const salonSchema = new mongoose.Schema({
  name    : {type: String,},
  image: { type: String},
  address: {
          street: { type: String, },
          state: { type: String,  },
          postalCode: { type: String,},
          city : { type: String,}
            },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  contact: {
            phone: { type: String, },
            email: {  type: String},
            },
  city :{ type: mongoose.Schema.Types.ObjectId, ref: 'City'} 
  // You can add more properties as needed
});

const Salon = mongoose.model("Salon", salonSchema);

module.exports = Salon;
