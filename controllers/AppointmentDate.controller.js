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
    };
    const slots = getSlots(req.body.doctor_id,req.body.start_time, req.body.end_time, parseInt(req.body.no_of_patients));
    AppointmentDate.create(data)
        .then(data => {
            p_slots = []
            for (let i = 0; i < slots.length - 1; i++) {
                p_slots.push({ slot_start_time: slots[i], slot_end_time: slots[i + 1], doctor_id: data.doctor_id, doctor_availability_id: data.id })
            }
            DoctorTimeSlots.bulkCreate(p_slots);
            res.send(data);
        })
    }