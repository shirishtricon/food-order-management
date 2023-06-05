const categoryService = require("../services/category.service");

const categoryNameToUuid = async (CategoryData) => {
  let CategoryWithUuidData = [];

  for (item of CategoryData) {
    const category = await categoryService.getCategoryByName(item.category);
    delete item.category;

    if (category) {
      item.category_uuid = category.uuid;
    } else {
      item.category_uuid = null;
    }
    CategoryWithUuidData.push(item);
  }
  return CategoryWithUuidData;
};

module.exports = { categoryNameToUuid };
