const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const categoryController = require("../Controllers/category.controller");
const itemController = require("../Controllers/item.controller");
const adminController = require("../Controllers/admin.controller");
const userController = require("../Controllers/user.controller");
const multer = require("multer");
const upload = multer();
const verifyToken = require("../Middleware/verifyToken");

app.use(
  cors({
    origin: "*",
  })
);

// APIs for categories
router.get(
  "/categories",
  verifyToken("Admin", "User"),
  categoryController.getAllCategories
);
router.post("/category", verifyToken("Admin"), categoryController.addCategory);
router.put(
  "/category/:uuid",
  verifyToken("Admin"),
  categoryController.updateCategory
);
router.delete(
  "/category/:uuid",
  verifyToken("Admin"),
  categoryController.deleteCategory
);

//APIs for Items
router.get("/items", verifyToken("Admin", "User"), itemController.getAllItems);
router.post("/item", verifyToken("Admin"), itemController.addItem);
router.put("/item/:uuid", verifyToken("Admin"), itemController.updateItem);
router.delete("/item/:uuid", verifyToken("Admin"), itemController.deleteItem);

//APIs for Admin
router.get("/getAllAdmins", adminController.getAllAdmin);
router.post("/addAdmin", adminController.addAdmin);
router.put("/updateAdmin/:uuid", adminController.updateAdmin);
router.delete("/deleteAdmin/:uuid", adminController.deleteAdmin);

//API for Bulk write
router.post(
  "/upload",
  upload.single("file"),
  verifyToken("Admin"),
  itemController.adddBulkItems
);

module.exports = router;
