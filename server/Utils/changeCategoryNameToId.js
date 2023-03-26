const categoryService = require("../Services/category.service");

const categoryNameToId = async (validCategoryData) => {
  let validCategoryWithIdData = [];

  for (item of validCategoryData) {
    const category = await categoryService.getCategoryByName(item.category);
    delete item.category;
    item.category_id = category.id;
    validCategoryWithIdData.push(item);
  }
  return validCategoryWithIdData;
};

module.exports = { categoryNameToId };
