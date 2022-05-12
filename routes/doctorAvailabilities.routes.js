module.exports = app => {
    const doctorAvailabilities = require("../controllers/DoctorAvailabilities.controller.js");
    var router = require("express").Router();
    router.post("/", doctorAvailabilities.create);
    app.use('/api/doctorAvailabilities', router);
};