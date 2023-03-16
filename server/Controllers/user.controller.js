const services = require("../Services");
const userService = services.userService;
const bcrypt = require("bcrypt");

const addUser = async (req, res) => {
  try {
    let user = req.body;
    for (const property in user) {
      if (user[property] === "") {
        delete user[property];
      }
    }
    hashedPassword = await bcrypt.hash(user.password, 5);
    user.password = hashedPassword;
    const data = await userService.addUserInfo(user);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addUser,
};
