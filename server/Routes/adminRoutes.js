const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const categoryController = require("../Controllers/category.controller");
const itemController = require("../Controllers/item.controller");
const adminController = require("../Controllers/admin.controller");

app.use(
  cors({
    origin: "*",
  })
);

// APIs for categories
router.get("/categories", categoryController.getAllCategories);
router.post("/category", categoryController.addCategory);
router.put("/category/:uuid", categoryController.updateCategory);
router.delete("/category/:uuid", categoryController.deleteCategory);

//APIs for Items
router.get("/items", itemController.getAllItems);
router.post("/item", itemController.addItem);
router.put("/item/:uuid", itemController.updateItem);
router.delete("/item/:uuid", itemController.deleteItem);

//APIs for Admin
router.get("/getAllAdmins", adminController.getAllAdmin);
router.post("/addAdmin", adminController.addAdmin);
router.put("/updateAdmin/:uuid", adminController.updateAdmin);
router.delete("/deleteAdmin/:uuid", adminController.deleteAdmin);

//APIs for users
// router.get("/users", userController.getAllUsers);
// router.post("/user", userController.addUser);
// router.put("/user/:id", userController.updateUser);
// router.delete("/user/:id", userController.deleteUSer);

module.exports = router;
