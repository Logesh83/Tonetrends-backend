const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./Database/dbconfig");
const path = require('path');

const HTTP_SERVER = express();

HTTP_SERVER.use(bodyParser.json());
HTTP_SERVER.use(bodyParser.urlencoded({ extended: false }));
HTTP_SERVER.use(cors());

// Routes
HTTP_SERVER.use("/", require("./App"));

// Static paths
const staticblogImagesPath = path.join(process.cwd(), 'Controllers', 'blogImageUpload', 'Image');
HTTP_SERVER.use('/api/blogImageUpload/Image', express.static(staticblogImagesPath));

const staticcityImagesPath = path.join(process.cwd(), 'Controllers', 'cityImageUpload', 'Image');
HTTP_SERVER.use('/api/cityImageUpload/Image', express.static(staticcityImagesPath));

const staticsalonImagesPath = path.join(process.cwd(), 'Controllers', 'salonImageUpload', 'Image');
HTTP_SERVER.use('/api/salonImageUpload/Image', express.static(staticsalonImagesPath));

const staticServiceImagesPath = path.join(process.cwd(), 'Controllers', 'ServiceImageUpload', 'Image');
HTTP_SERVER.use('/api/ServiceImageUpload/Image', express.static(staticServiceImagesPath));

const staticTipImagesPath = path.join(process.cwd(), 'Controllers', 'TipImageUpload', 'Image');
HTTP_SERVER.use('/api/TipImageUpload/Image', express.static(staticTipImagesPath));

const PORT = process.env.PORT || 3000;
HTTP_SERVER.listen(PORT, () => {
    console.log("Listening to the port 3000");
});

HTTP_SERVER.get("/", (req, res) => {
    res.send("Welcome to my port");
});
