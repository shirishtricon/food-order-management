const db = require("../models");

const InvalidItems = db.sequelize.models.invaliditems;

const getInvalidItems = async () => {
  const data = await InvalidItems.findAll({
    attributes: ["uuid", "name", "price", "category"],
  });
  return data;
};

const getInvalidItemByUuid = async (uuid) => {
  const data = await InvalidItems.findOne({ uuid: uuid });
  return data;
};

const addInvalidItem = async (itemDetails) => {
  const data = await InvalidItems.bulkCreate(itemDetails);
};

const deleteInvalidItem = async (uuid) => {
  const data = await InvalidItems.destroy({ where: { uuid: uuid } });
};

module.exports = {
  getInvalidItems,
  getInvalidItemByUuid,
  addInvalidItem,
  deleteInvalidItem,
};
