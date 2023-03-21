const db = require("../models");

const Items = db.sequelize.models.items;

const getAllItems = async () => {
  const data = await Items.findAll({
    attributes: ["uuid", "id", "name", "price", "category_id"],
  });
  return data;
};

const addItem = async (ItemDetails) => {
  console.log(ItemDetails);
  await Items.create(ItemDetails);
  const data = await Items.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "name"],
  });
  return data;
};

const updateItem = async (uuid, body) => {
  await Items.update(body, {
    where: {
      uuid: uuid,
    },
  });
};

const deleteItem = async (uuid) => {
  await Items.destroy({ where: { uuid: uuid } });
};

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
};
