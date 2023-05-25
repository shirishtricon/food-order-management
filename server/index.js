const mode = process.env.NODE_ENV || "dev";
const envFile = `./.env.${mode}`;
require("dotenv").config({ path: envFile });

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const adminRoutes = require("./Routes/adminRoutes");
const userRoutes = require("./Routes/user.route");
const login = require("./Middleware/loginAuth");
const multer = require("multer");
const xlsx = require("xlsx");
const upload = multer();
const db = require("./models");
const port = 5000;

const Items = db.sequelize.models.items;

require("./models");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("App is running on port : " + port);
});
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.post("/login", login.login);

// app.post("/upload", upload.single("file"), async (req, res) => {
//   const file = req.file;

//   const workbook = xlsx.read(file.buffer);
//   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//   const data = xlsx.utils.sheet_to_json(worksheet);

//   try {
//     console.log(data);
//     await Items.bulkCreate(data);

//     res.status(200).send("File uploaded successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error uploading file");
//   }
// });

app.listen(port, () => {
  console.log("App is running on port 5000");
});
