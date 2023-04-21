const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const userController = require("../Controllers/user.controller");
const verifyToken = require("../Middleware/verifyToken");
const orderController = require("../Controllers/order.controller");

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

//APIs for orders
router.get("/orders", verifyToken("Admin"), orderController.getAllOrders);
router.post("/order", verifyToken("User", "Admin"), orderController.addOrder);
module.exports = router;
