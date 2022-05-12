module.exports = (sequelize, Sequelize) => {
    const DoctorAvailabilities = sequelize.define("doctor_availabilities", {
        doctor_id: {
            type: Sequelize.INTEGER,
            unique: true
        },
        start_time: {
            type: Sequelize.STRING
        },
        end_time: {
            type: Sequelize.STRING
        },
        no_of_patients: {
            type: Sequelize.INTEGER
        },
    });
    return DoctorAvailabilities;
};