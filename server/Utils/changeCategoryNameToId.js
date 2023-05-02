const categoryService = require("../Services/category.service");

const categoryNameToUuid = async (validCategoryData) => {
  let validCategoryWithIdData = [];

  for (item of validCategoryData) {
    const category = await categoryService.getCategoryByName(item.category);
    delete item.category;
    item.category_uuid = category.uuid;
    validCategoryWithIdData.push(item);
  }
  return validCategoryWithIdData;
};

module.exports = { categoryNameToUuid };
