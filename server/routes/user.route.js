const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const orderController = require("../controllers/order.controller");

app.use(
  cors({
    origin: "*",
  })
);

//APIs on users

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get All Users
 *     description: Get all Users
 *     tags:
 *       - Users
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
 *                   emp_id:
 *                     type: string
 *                   name:
 *                     type: string
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.get("/", verifyToken("Admin"), userController.getAllUsers);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: User Sign Up
 *     description: User Sign Up
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emp_id:
 *                 type: number
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               contact_no:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns details of the signed up user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uuid:
 *                   type: string
 *                   description: Random UUID generated from server
 *                 emp_id:
 *                   type: number
 *                   description: Employee ID of the Signed Up user
 *                 first_name:
 *                   type: string
 *                   description: First name of the Signed Up user
 *                 email:
 *                   type: string
 *                   description: Email ID of the Signed Up user
 *                 password:
 *                   type: string
 *                   description: Password of the Signed Up user in encrypted format
 *                 contact_no:
 *                   type: string
 *                   description: Random UUID generated from server
 *                 last_name:
 *                   type: string
 *                   description: Last name of the Signed Up user if any
 *       500:
 *         description: Internal server error
 */
router.post("/", userController.addUser);

/**
 * @swagger
 * /user/{uuid}:
 *   put:
 *     summary: Update User
 *     description: Update User Details
 *     tags:
 *       - Users
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
 *               emp_id:
 *                 type: number
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               contact_no:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updates User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: User Updated Successfully!
 *       404:
 *         description: No token found
 *       500:
 *         description: Internal server Error
 */
router.put("/:uuid", verifyToken("Admin", "User"), userController.updateUser);

/**
 * @swagger
 * /user/{uuid}:
 *   delete:
 *     summary: Delete User
 *     description: Delete User
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deletes User.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: User Deleted Successfully!
 *       404:
 *         description: No token found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:uuid",
  verifyToken("Admin", "User"),
  userController.deleteUSer
);

//APIs for orders

/**
 * @swagger
 * /user/orders:
 *   get:
 *     summary: Get All Orders
 *     description: Get All Orders irrespective of users
 *     tags:
 *       - Orders
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
 *                   user_uuid:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                   subtotal:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.get("/orders", verifyToken("Admin"), orderController.getAllOrders);

/**
 * @swagger
 * /user/order/{user_uuid}:
 *   get:
 *     summary: Get User Orders
 *     description: Get orders for a specific user within a date range
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: path
 *         name: user_uuid
 *         required: true
 *         description: UUID of the user
 *         schema:
 *           type: string
 *       - in: query
 *         name: fromDate
 *         description: Start date of the date range
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         description: End date of the date range
 *         required: true
 *         schema:
 *           type: string
 *           format: date
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
 *                   user_uuid:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         quantity:
 *                           type: integer
 *                   subtotal:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No transactions found
 */
router.get(
  "/order/:uuid",
  verifyToken("Admin", "User"),
  orderController.getSingleUserOrders
);

/**
 * @swagger
 * /user/order:
 *   post:
 *     summary: Add an Order
 *     description: Add a new order for a user
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_uuid:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *               subtotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized request
 *       404:
 *         description: No token found
 */
router.post("/order", verifyToken("Admin", "User"), orderController.addOrder);
module.exports = router;
