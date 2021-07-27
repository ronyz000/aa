const express = require("express");
const app = express();

const bodyParer = require("body-parser");

app.use(bodyParer.json());

const db = require("./models");
db.sequelize.sync();

const zoonRoute = require("./routes/zoon.route");
const rackRoute = require("./routes/rack.route");

app.use("/zoon", zoonRoute);
app.use("/rack", rackRoute);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;