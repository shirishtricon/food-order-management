const returnArrays = (allCategories, nonExistData) => {
  let validCategoryItem = [];
  let invalidCategoryItem = [];
  for (item of nonExistData) {
    if (allCategories.includes(item.category)) {
      validCategoryItem.push(item);
    } else {
      invalidCategoryItem.push(item);
    }
  }
  return [validCategoryItem, invalidCategoryItem];
};

module.exports = { returnArrays };
