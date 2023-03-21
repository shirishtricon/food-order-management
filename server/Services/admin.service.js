const db = require("../models");

const Admin = db.sequelize.models.admin;

const getAllAdmin = async () => {
  const data = await Admin.findAll({ attributes: ["uuid", "name", "email"] });
  return data;
};

const getAdminByEmail = async (email) => {
  const data = await Admin.findOne({
    where: { email: email },
    attributes: ["name", "email", "password"],
  });
  const adminData = {
    name: data.name,
    email: data.email,
    password: data.password,
  };
  return adminData;
};

const addAdmin = async (adminDetails) => {
  await Admin.create(adminDetails);
  const data = await Admin.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "name"],
  });
  return data;
};

const updateAdmin = async (uuid, body) => {
  await Admin.update(body, {
    where: {
      uuid: uuid,
    },
  });
};

const deleteAdmin = async (uuid) => {
  await Admin.destroy({ where: { uuid: uuid } });
};

module.exports = {
  getAllAdmin,
  getAdminByEmail,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
