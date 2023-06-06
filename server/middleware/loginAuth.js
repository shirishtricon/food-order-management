const bcrypt = require("bcrypt");
const adminController = require("../controllers/admin.controller");
const userController = require("../controllers/user.controller");
const secretKey = "secretKey";
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminController.getAdminByEmail(email);
    const user = await userController.getUserByEmail(email);
    if (admin) {
      const passwordMatch = await bcrypt.compare(password, admin.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid Credentails" });
      }
      admin.role = "Admin";
      genereateToken(res, admin);
    } else if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        res.status(401).json({ message: "Invalid Credentails" });
      }

      user.name = user.last_name
        ? user.first_name + " " + user.last_name
        : user.first_name;
      user.role = "User";
      genereateToken(res, user);
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const genereateToken = (res, details) => {
  delete details.password;

  const options = {
    expiresIn: "1800s",
  };

  const newDetails = {
    uuid: details.uuid,
    name: details.name,
    email: details.email,
    role: details.role,
  };
  const token = jwt.sign(newDetails, secretKey, options);
  res.status(200).json({ token: token });
};

module.exports = { login };
