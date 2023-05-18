const categoryService = require("../Services/category.service");

const categoryNameToUuid = async (validCategoryData) => {
  let validCategoryWithUuidData = [];

  for (item of validCategoryData) {
    const category = await categoryService.getCategoryByName(item.category);
    delete item.category;
    item.category_uuid = category.uuid;
    validCategoryWithUuidData.push(item);
  }
  return validCategoryWithUuidData;
};

module.exports = { categoryNameToUuid };
