const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const userController = require("../Controllers/user.controller");

app.use(
  cors({
    origin: "*",
  })
);

//APIs for users
router.get("/", userController.getAllUsers);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUSer);

module.exports = router;
