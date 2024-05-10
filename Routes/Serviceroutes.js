const express = require("express");
const router = express.Router();
const { createService, updateService, deleteService, getAllServices, getServiceById, serviceUploadImages,serviceuploadmultipleimage } = require("../Controllers/Service");


router.post("/createService", createService);
router.post("/updateService/:id", updateService);
router.post("/deleteService/:id", deleteService);

router.post("/serviceUploadImages",serviceUploadImages);
router.post("/serviceUploadmultipleImages",serviceuploadmultipleimage);

router.get("/getallService", getAllServices);
router.get("/getbyid/Service/:id", getServiceById);


module.exports = router;
