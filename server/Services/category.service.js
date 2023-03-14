const db = require("../models");

const Categories = db.sequelize.models.categories;

const getAllCategories = async () => {
  const data = await Categories.findAll({ attributes: ["name", "id"] });
  return data;
};

const addCategory = async (categoryName) => {
  await Categories.create({ name: categoryName });
  const data = await Categories.findOne({
    order: [["id", "DESC"]],
    attributes: ["id", "name"],
  });
  return data;
};

const updateCategory = async (id, body) => {
  await Categories.update(body, {
    where: {
      id: id,
    },
  });
};

const deleteCategory = async (id) => {
  await Categories.destroy({ where: { id: id } });
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
