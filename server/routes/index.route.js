const router = require("express").Router();
const adminRouter = require("./admin.route");
const userRouter = require("./user.route");

router.use("/admin", adminRouter);
router.use("/user", userRouter);

module.exports = router;
