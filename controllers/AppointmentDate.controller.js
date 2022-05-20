const db = require("../models");
const DoctorAvailabilities = db.doctorAvailabilities;
const DoctorTimeSlots = db.PatientBookingSlots;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    const data = {
        appointment_Date:req.body.appointment_date,
        doctor_id: req.body.doctor_id,
        doctor_time_slot_id: req.body.doctor_time_slot_id,
        no_of_patients: req.body.no_of_patients
    }
}
