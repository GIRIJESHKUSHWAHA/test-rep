module.exports = (sequelize, Sequelize) => {
    const DoctorTimeSlots = sequelize.define("doctor_time_slots", {

        doctor_id: {
            type: Sequelize.INTEGER
        },
        doctor_availability_id: {
            type: Sequelize.INTEGER
        },
        slot_start_time: {
            type: Sequelize.STRING
        },
        slot_end_time: {
            type: Sequelize.STRING
        },
    });
    return DoctorTimeSlots;
};