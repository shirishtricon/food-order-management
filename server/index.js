const mode = process.env.NODE_ENV || "dev";
const envFile = `./.env.${mode}`;
require("dotenv").config({ path: envFile });

const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const indexRouter = require("./routes/index.route");
const login = require("./middleware/loginAuth");
const multer = require("multer");
const xlsx = require("xlsx");
const upload = multer();
const db = require("./models");
const port = 5001;

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const api_base_path = "/api/v1";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Food Bill Management API",
      description: "Food Bill Management API Information",
      contact: {
        name: "Amazing Developer",
      },
    },
    servers: [{ url: "http://localhost:5001" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // ['.routes/*.js']
  apis: ["index.js", "./Routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(
  `${api_base_path}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

const Items = db.sequelize.models.items;

require("./models");

app.use(cors());

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * @swagger
 * /:
 *  get:
 *    description: To check the health of the application
 *    responses:
 *      '200':
 *        description: App is running on port 5001
 */

app.get(api_base_path, (req, res) => {
  res.send("App is running on port : " + port);
});
app.use(api_base_path, indexRouter);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login user
 *     description: Login a user using email and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 */

app.post(`${api_base_path}/login`, login.login);

app.listen(port, () => {
  console.log("App is running on port 5001");
});
