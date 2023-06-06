const services = require("../services");
const userService = services.userService;
const bcrypt = require("bcrypt");
const noBlankProperty = require("../utils/checkForEmptyProperty");
const nonEmptyLastName = require("../utils/nonEmptyLastName");

const addUser = async (req, res) => {
  try {
    let user = noBlankProperty.removeEmptyProperty(req.body);
    console.log(user);
    let existingUser = await userService.getUserByEmail(user.email);
    if (existingUser) {
      res.status(409).json({ message: "User already exist" });
      return;
    }
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
    if (!data) {
      res.status(404).json({ message: "No Users Found" });
    }
    let firstNameLastNameMappedData =
      nonEmptyLastName.checkForNonEmptyLastName(data);
    res.status(200).json(firstNameLastNameMappedData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserByEmail = async (email) => {
  const data = await userService.getUserByEmail(email);
  return data;
};

const updateUser = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    if (!uuid || req.body.uuid) {
      res.status(400).json({ message: "Bad Request!" });
    } else {
      let user = noBlankProperty.removeEmptyProperty(req.body);
      if (user.password) {
        hashedPassword = await bcrypt.hash(user.password, 5);
        user.password = hashedPassword;
      }
      await userService.updateUser(uuid, user);

      res.status(200).json({ message: "User Updated Successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUSer = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    await userService.deleteUser(uuid);
    res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUSer,
};
