const db = require("../models");

const Users = db.sequelize.models.users;

const addUserInfo = async (user) => {
  console.log(user);
  const userh = await Users.create(user);
  console.log(userh);
  const data = await Users.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "first_name", "last_name"],
  });
  return data;
};

module.exports = {
  addUserInfo,
};
