const { where } = require("sequelize");
const db = require("../models");

const Categories = db.sequelize.models.categories;

const getAllCategories = async () => {
  const data = await Categories.findAll({ attributes: ["uuid", "name", "id"] });
  return data;
};

const getCategoryByName = async (categoryName) => {
  const Catedata = await Categories.findOne({ where: { name: categoryName } });
  return Catedata;
};

const addCategory = async (categoryName) => {
  await Categories.create({ name: categoryName });
  const data = await Categories.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "name"],
  });
  return data;
};

const updateCategory = async (uuid, body) => {
  await Categories.update(body, {
    where: {
      uuid: uuid,
    },
  });
};

const deleteCategory = async (uuid) => {
  await Categories.destroy({ where: { uuid: uuid } });
};

module.exports = {
  getAllCategories,
  getCategoryByName,
  addCategory,
  updateCategory,
  deleteCategory,
};
