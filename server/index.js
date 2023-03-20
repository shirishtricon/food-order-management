const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/user.route");

require("./models");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
