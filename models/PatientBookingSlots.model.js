module.exports = (sequelize, Sequelize) => {
    const PatientBookingSlots = sequelize.define("patient_booking_slots", {    
        patient_id: {
            type: Sequelize.INTEGER
        },
        doctor_time_slot_id: {
            type: Sequelize.INTEGER
        },
        appointment_date: {
            type: Sequelize.STRING
        }
    });
    return PatientBookingSlots;
};