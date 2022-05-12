const db = require("../models/index");
const DoctorAvailabilities = db.doctorAvailabilities;
const DoctorTimeSlots = db.doctorTimeSlots;
const Op = db.Sequelize.Op;
exports.create = (req, res) => {
    const data = {
        doctor_id: req.body.doctor_id,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        no_of_patients: req.body.no_of_patients
    };
    const slots = getSlots(req.body.start_time, req.body.end_time, parseInt(req.body.no_of_patients));
    DoctorAvailabilities.create(data)
        .then(data => {
            d_slots = []
            for (let i = 0; i < slots.length - 1; i++) {
                d_slots.push({ slot_start_time: slots[i], slot_end_time: slots[i + 1], doctor_id: data.doctor_id, doctor_availability_id: data.id })
            }
            DoctorTimeSlots.bulkCreate(d_slots);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "data inserted successfully."
            });
        });
};

function getSlots(start, end, num) {
    try {

        var today = new Date();
        date = today.getFullYear() + '-'
            + ((today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + '-'
            + (today.getDate() > 9 ? today.getDate() : '0' + today.getDate());

        start_arr = start.split(' ')[0].split(':');
        end_arr = end.split(' ')[0].split(':');

        if (start.split(' ')[1].toUpperCase() === 'PM') {
            start_arr[0] = parseInt(start_arr[0]) + 12
        }
        if (end.split(' ')[1].toUpperCase() === 'PM') {
            end_arr[0] = parseInt(end_arr[0]) + 12
        }

        start = (parseInt(start_arr[0]) > 9 ? start_arr[0] : '0' + start_arr[0]) + ':' + (parseInt(start_arr[1]) > 9 ? start_arr[1] : '0' + start_arr[1]);
        end = (parseInt(end_arr[0]) > 9 ? end_arr[0] : '0' + end_arr[0]) + ':' + (parseInt(end_arr[1]) > 9 ? end_arr[1] : '0' + end_arr[1]);


        start = new Date(date + 'T' + start)
        end = new Date(date + 'T' + end)

        startTimeStamp = start.getTime();
        endTimeStamp = end.getTime();

        timeForOne = (endTimeStamp - startTimeStamp) / num;
        tampTime = startTimeStamp;
        slots = []
        for (let i = 0; i <= num; i++) {
            diffDate = new Date(tampTime);
            slots.push(`${diffDate.getHours() > 9 ? diffDate.getHours() : '0' + diffDate.getHours()}:${diffDate.getMinutes() > 9 ? diffDate.getMinutes() : '0' + diffDate.getMinutes()}`)
            tampTime += timeForOne;
        }
        return slots;
    } catch (err) {
        console.log(err)
    }
}