const express = require("express");
const router = express.Router();
const { createSalon, updateSalon, deleteSalon, getAllSalons, getSalonById, salonUploadImages,salonuploadmultipleimage} = require("../Controllers/salon");


router.post("/createSalon", createSalon);
router.post("/updateSalon/:id", updateSalon);
router.post("/deleteSalon/:id", deleteSalon);

router.post("/salonUploadImages",salonUploadImages);
router.post("/salonuploadmultipleimage",salonuploadmultipleimage);

router.get("/getallSalon", getAllSalons);
router.get("/getbyid/Salon/:id", getSalonById);


module.exports = router;
