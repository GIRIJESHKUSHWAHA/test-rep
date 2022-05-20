const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

DoctorAvailabilities = require("./DoctorAvailabilities.model")(sequelize, Sequelize);
DoctorTimeSlots = require("./DoctorTimeSlots.model")(sequelize, Sequelize);
PatientBookingSlots = require("./PatientBookingSlots.model")(sequelize, Sequelize);

DoctorAvailabilities.hasMany(DoctorTimeSlots, { as: "doctor_time_slots" });
DoctorTimeSlots.belongsTo(DoctorAvailabilities, {
  foreignKey: "doctor_availability_id",
  as: "doctor_availabilities",
});

PatientBookingSlots.belongsTo(DoctorTimeSlots, {
  foreignKey: "doctor_time_slot_id",
  as: "doctor_time_slots",
});

// db connection
db.doctorAvailabilities = require("./DoctorAvailabilities.model")(sequelize, Sequelize);
db.doctorTimeSlots= require("./DoctorTimeSlots.model")(sequelize, Sequelize);
module.exports = db;


//  