const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const userController = require("../Controllers/user.controller");
const verifyToken = require("../Middleware/verifyToken");

app.use(
  cors({
    origin: "*",
  })
);

//APIs for users
router.get("/", verifyToken("Admin"), userController.getAllUsers);
router.post("/", userController.addUser);
router.put("/:id", verifyToken("Admin", "User"), userController.updateUser);
router.delete("/:id", verifyToken("Admin", "User"), userController.deleteUSer);

module.exports = router;
