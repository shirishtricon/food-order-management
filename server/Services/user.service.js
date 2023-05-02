const db = require("../models");

const Users = db.sequelize.models.users;

const addUser = async (userData) => {
  console.log(userData);
  const data = await Users.create(userData);
  // console.log(user);
  return data;
};

const getAllUsers = async () => {
  const data = await Users.findAll({
    attributes: [
      "uuid",
      "id",
      "emp_id",
      "first_name",
      "last_name",
      "email",
      "contact_no",
    ],
  });
  return data;
};

const getUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: { email: email },
    attributes: [
      "uuid",
      "first_name",
      "last_name",
      "email",
      "password",
      "contact_no",
    ],
  });
  return data;
};

const updateUser = async (uuid, data) => {
  await Users.update(data, {
    where: {
      uuid: uuid,
    },
  });
};

const deleteUser = async (uuid) => {
  await Users.destroy({ where: { uuid: uuid } });
};

module.exports = {
  addUser,
  getAllUsers,
  getUserByEmail,
  updateUser,
  deleteUser,
};
