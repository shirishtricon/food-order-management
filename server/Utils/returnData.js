const itemService = require("../Services/item.service");
const categoryService = require("../Services/category.service");

const returnValidAndInvalidData = async (allItems) => {
  let validItems = [];
  let invalidItems = [];

  for (item of allItems) {
    if (!item.name || typeof item.name !== "string") {
      invalidItems.push(item);
    } else {
      let itemPresent = await itemService.getItemByName(item.name);
      if (!itemPresent) {
        // const index = allItems.indexOf(item);
        // allItems.splice(index, 1);
        if (!item.price || typeof item.price !== "number") {
          invalidItems.push(item);
        } else {
          if (!item.category) {
            invalidItems.push(item);
          } else {
            let categoryPresent = await categoryService.getCategoryByName(
              item.category
            );
            if (!categoryPresent) {
              invalidItems.push(item);
            } else {
              validItems.push(item);
            }
          }
        }
      }
    }
  }
  return [validItems, invalidItems];
};

module.exports = { returnValidAndInvalidData };
