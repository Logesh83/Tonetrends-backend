const express= require("express");
const APP_SERVER= express();

APP_SERVER.use("/api",require("./Routes/Blogroutes"));
APP_SERVER.use("/api",require("./Routes/salonroutes"));
APP_SERVER.use("/api",require("./Routes/Serviceroutes"));
APP_SERVER.use("/api",require("./Routes/Cityroutes"));
APP_SERVER.use("/api",require("./Routes/Tiproutes"));
module.exports = APP_SERVER;
 