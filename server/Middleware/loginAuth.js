const bcrypt = require("bcrypt");
const adminController = require("../Controllers/admin.controller");
const userController = require("../Controllers/user.controller");
const secretKey = "secretKey";
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (role === "Admin") {
      const admin = await adminController.getAdminByEmail(email);
      if (!admin) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      genereateToken(res, admin);
    } else if (role === "User") {
      const user = await userController.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      genereateToken(res, user);
    } else {
      res.status(404).json({ message: "Role not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const genereateToken = (res, details) => {
  delete details.password;
  //   jwt.sign((details), secretKey, { expiresIn: "300s" }, (err, token) => {
  //     res.status(200).json({ token: token });
  //   });
  const options = {
    expiresIn: "300s",
  };
  const token = jwt.sign(details, secretKey, options);
  res.status(200).json({ token: token });
};

module.exports = { login };
