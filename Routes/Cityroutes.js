const express = require("express");
const router = express.Router();

const { createCity, updateCity, deleteCity, getAllCities, getCityById, cityUploadImages,cityuploadmultipleimage } = require("../Controllers/City");


router.post("/createCity", createCity);
router.post("/updateCity/:id", updateCity);
router.post("/deleteCity/:id", deleteCity);

router.post("/cityUploadImages",cityUploadImages);
router.post("/cityUploadmultipleImages",cityuploadmultipleimage);


router.get("/getallCity", getAllCities);
router.get("/getbyid/City/:id", getCityById);


module.exports = router;
