const services = require("../Services");
const adminService = services.adminService;
const bcrypt = require("bcrypt");
const noBlankProperty = require("../Utils/checkForEmptyProperty");

const addAdmin = async (req, res) => {
  try {
    let admin = noBlankProperty.removeEmptyProperty(req.body);
    console.log(admin);
    hashedPassword = await bcrypt.hash(admin.password, 5);
    admin.password = hashedPassword;
    const data = await adminService.addAdmin(admin);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllAdmin = async (req, res) => {
  try {
    let data = await adminService.getAllAdmin();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAdminByEmail = async (email) => {
  const data = await adminService.getAdminByEmail(email);
  return data;
};

const updateAdmin = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    if (!uuid || req.body.uuid) {
      res.status(400).json({ message: "Bad Request!" });
    } else {
      let admin = noBlankProperty.removeEmptyProperty(req.body);
      if (admin.password) {
        hashedPassword = await bcrypt.hash(admin.password, 5);
        admin.password = hashedPassword;
      }
      await adminService.updateAdmin(uuid, admin);
      res.status(200).json({ message: "admin Updated Successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    await adminService.deleteAdmin(uuid);
    res.status(200).json({ message: "admin Deleted Successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addAdmin,
  getAdminByEmail,
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
};
