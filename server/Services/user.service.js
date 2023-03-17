const db = require("../models");

const Users = db.sequelize.models.users;

const addUser = async (userData) => {
  console.log(userData);
  const user = await Users.create(userData);
  console.log(user);
  const data = await Users.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "first_name", "last_name"],
  });
  return data;
};

const getAllUsers = async () => {
  const data = await Users.findAll({
    attributes: [
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

const updateUser = async (id, data) => {
  await Users.update(data, {
    where: {
      id: id,
    },
  });
};

const deleteUser = async (id) => {
  await Users.destroy({ where: { id: id } });
};

module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
