const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
db.sequelize.sync();

var corsOptions = {
    origin: "http://localhost:8000"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/doctorAvailabilities.routes")(app);

app.get("/", (req, res) => {
    res.json({ message: "hello" });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});