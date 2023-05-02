const db = require("../models");

const Items = db.sequelize.models.items;

const getAllItems = async () => {
  const data = await Items.findAll({
    attributes: ["uuid", "name", "price", "category_uuid"],
  });
  return data;
};

const getItemByName = async (name) => {
  const data = await Items.findOne({
    where: {
      name: name,
    },
  });
  return data;
};

const addItem = async (ItemDetails) => {
  const data = await Items.create(ItemDetails);
  // .then((res) => {
  //   return res;
  // })
  // .catch((err) => {
  //   throw new Error(err);
  //   console.log(err);
  // });
  return data;
};

const adddBulkItems = async (bulkData) => {
  await Items.bulkCreate(bulkData, { validate: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new error(err);
      console.log(err);
    });
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
  getItemByName,
  addItem,
  adddBulkItems,
  updateItem,
  deleteItem,
};
