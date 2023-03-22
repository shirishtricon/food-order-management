const categoryNameToId = (categoryDetails, validCategoryData) => {
  let validCategoryWithIdData = [];

  for (item of validCategoryData) {
    category = categoryDetails.filter((category) => {
      return item.category === category.name;
    });
    delete item.category;
    item.category_id = category[0].id;
    validCategoryWithIdData.push(item);
  }
  return validCategoryWithIdData;
};

module.exports = { categoryNameToId };
