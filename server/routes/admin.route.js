const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const categoryController = require("../controllers/category.controller");
const itemController = require("../controllers/item.controller");
const adminController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller");
const multer = require("multer");
const upload = multer();
const verifyToken = require("../middleware/verifyToken");

app.use(
  cors({
    origin: "*",
  })
);

// APIs for categories
/**
 * @swagger
 * /admin/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories
 *     tags:
 *       - Categories
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.get(
  "/categories",
  verifyToken("Admin", "User"),
  categoryController.getAllCategories
);

/**
 * @swagger
 * /admin/category:
 *   post:
 *     summary: Add a catgory
 *     description: Add a category from admin access
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns UUID and the name of the Category inserted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: Random UUID generated from server
 *                 name:
 *                   type: string
 *                   description: name of the category inserted
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.post("/category", verifyToken("Admin"), categoryController.addCategory);

/**
 * @swagger
 * /admin/category/{uuid}:
 *   put:
 *     summary: Update Category
 *     description: Update category from admin access
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updates category name with admin access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Category Updated Successfully!
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.put(
  "/category/:uuid",
  verifyToken("Admin"),
  categoryController.updateCategory
);

/**
 * @swagger
 * /admin/category/{uuid}:
 *   delete:
 *     summary: Delete Category
 *     description: Delete category from admin access
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deletes category with admin access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Category Deleted Successfully!
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.delete(
  "/category/:uuid",
  verifyToken("Admin"),
  categoryController.deleteCategory
);

//APIs for Items
/**
 * @swagger
 * /admin/items:
 *   get:
 *     summary: Get Items
 *     description: Get all Items
 *     tags:
 *       - Items
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   uuid:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   category_uuid:
 *                     type: string
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.get("/items", verifyToken("Admin", "User"), itemController.getAllItems);

/**
 * @swagger
 * /admin/item:
 *   post:
 *     summary: Add Item
 *     description: Add an Item from admin access
 *     tags:
 *       - Items
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               description:
 *                 type: string
 *                 required: false
 *               price:
 *                 type: number
 *                 required: true
 *               ratings:
 *                 type: string
 *                 required: false
 *               discount:
 *                 type: string
 *                 required: false
 *               category_uuid:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Returns the details the inserted item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: Random UUID generated from server
 *                 name:
 *                   type: string
 *                   description: name of the Item inserted
 *                 price:
 *                   type: number
 *                   description: Item price
 *                 category_uuid:
 *                   type: string
 *                   description: UUID of the category to which the item belongs to
 *                 description:
 *                   type: string
 *                   description: Description of the Item if any
 *                 ratings:
 *                   type: string
 *                   description: Ratings for the Item
 *                 discount:
 *                   type: string
 *                   description: Discount for the Item
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.post("/item", verifyToken("Admin"), itemController.addItem);

/**
 * @swagger
 * /admin/item/{uuid}:
 *   put:
 *     summary: Update Item
 *     description: Update Item from admin access
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               ratings:
 *                 type: string
 *               discount:
 *                 type: string
 *               category_uuid:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updates Item name with admin access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Item Updated Successfully!
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.put("/item/:uuid", verifyToken("Admin"), itemController.updateItem);

/**
 * @swagger
 * /admin/item/{uuid}:
 *   delete:
 *     summary: Delete Item
 *     description: Delete Item from admin access
 *     tags:
 *       - Items
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deletes an Item with admin access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Item deleted Successfully!
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
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
