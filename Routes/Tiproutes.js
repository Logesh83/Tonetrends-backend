const express = require("express");
const router = express.Router();
const { createTip, updateTip, deleteTip, getAllTips, getTipById, tipUploadImages,tipuploadmultipleimage } = require("../Controllers/Tip");


router.post("/createTip", createTip);
router.post("/updateTip/:id", updateTip);
router.post("/deleteTip/:id", deleteTip);

router.post("/tipUploadImages",tipUploadImages);
router.post("/tipUploadmultipleImages",tipuploadmultipleimage );
                                

router.get("/getallTips", getAllTips);
router.get("/getbyid/Tip/:id", getTipById);


module.exports = router;
