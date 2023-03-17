const services = require("../Services");
const userService = services.userService;
const bcrypt = require("bcrypt");
const noBlankProperty = require("../Utils/checkForEmptyProperty");

const addUser = async (req, res) => {
  try {
    let user = noBlankProperty.checkForEmptyProperty(req.body);
    console.log(user);
    hashedPassword = await bcrypt.hash(user.password, 5);
    user.password = hashedPassword;
    const data = await userService.addUser(user);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let data = await userService.getAllUsers();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id || req.body.id) {
      res.status(400).json({ message: "Bad Request!" });
    } else {
      userData = noBlankProperty.checkForEmptyProperty(req.body);
      await userService.updateUser(id, userData);

      res.status(200).json({ message: "User Updated Successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUSer = async (req, res) => {
  try {
    let id = req.params.id;
    await userService.deleteUser(id);
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  deleteUSer,
};
