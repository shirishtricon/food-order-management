const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const categoryController = require("../Controllers/category.controller");
const itemController = require("../Controllers/item.controller");
const userController = require("../Controllers/user.controller");

app.use(
  cors({
    origin: "*",
  })
);

// APIs for categories
router.get("/categories", categoryController.getAllCategories);
router.post("/category", categoryController.addCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

//APIs for Items
router.get("/items", itemController.getAllItems);
router.post("/item", itemController.addItem);
router.put("/item/:id", itemController.updateItem);
router.delete("/item/:id", itemController.deleteItem);

//APIs for users
router.get("/users", userController.getAllUsers);
router.post("/user", userController.addUser);
router.put("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUSer);

module.exports = router;
