const bcrypt = require("bcrypt");
const adminController = require("../Controllers/admin.controller");
const userController = require("../Controllers/user.controller");
const secretKey = "secretKey";
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // if (role === "Admin") {
    //   const admin = await adminController.getAdminByEmail(email);
    //   if (!admin) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
    //   const passwordMatch = await bcrypt.compare(password, admin.password);
    //   if (!passwordMatch) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
    //   genereateToken(res, admin);
    // } else if (role === "User") {
    //   const user = await userController.getUserByEmail(email);
    //   if (!user) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
    //   const passwordMatch = await bcrypt.compare(password, user.password);
    //   if (!passwordMatch) {
    //     return res.status(401).json({ message: "Invalid credentials" });
    //   }
    //   genereateToken(res, user);
    // } else {
    //   res.status(404).json({ message: "Role not found" });
    // }

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
      user.name = user.first_name + " " + user.last_name;
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
    expiresIn: "300s",
  };

  const newDetails = {
    name: details.name,
    email: details.email,
    role: details.role,
  };
  const token = jwt.sign(newDetails, secretKey, options);
  res.status(200).json({ token: token });
};

module.exports = { login };
