const services = require("../Services");
const xlsx = require("xlsx");
const itemService = services.itemService;
const categoryService = services.categoryService;
const ifArrayEqual = require("../Utils/ifAllDataEqual");
const returnCategoryArray = require("../Utils/returnCategoryArray");
const validIdData = require("../Utils/changeCategoryNameToId");

const getAllItems = async (req, res) => {
  await itemService
    .getAllItems()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const addItem = async (req, res) => {
  items = req.body;
  for (const property in items) {
    if (items[property] === "") {
      delete items[property];
    }
  }
  console.log(items);

  await itemService
    .addItem(items)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const adddBulkItems = async (req, res) => {
  try {
    const file = req.file;
    let nonExistData = [];
    let existData = [];
    let allCategories = [];
    //for parsing the Excel data
    const workbook = xlsx.read(file.buffer);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(worksheet); // JSON data
    items = data;

    // two arrays for existing and non Existing data
    for (item of items) {
      let itemExist = await itemService.getItemByName(item.name);
      if (itemExist) {
        existData.push(item); // data exist
      } else {
        nonExistData.push(item); // data not exist
      }
    }

    const categories = await categoryService.getAllCategories();
    for (category of categories) {
      allCategories.push(category.name); // array of all categories
    }

    // to check if Excel data and data from database are fully equal
    const areArraysEqual = ifArrayEqual.ifArrayEqual(data, existData);
    // if yes, then send 400 status code
    if (areArraysEqual) {
      res.status(400).json({ message: "All Items already exist" });
    } else {
      // if all data does not exist, then return two arrays: one with valid category, other with invalid category(the category name entered in excel)
      itemCategoryData = returnCategoryArray.returnArrays(
        allCategories,
        nonExistData
      );
      validCategoryData = itemCategoryData[0]; // with valid category
      invalidCategoryData = itemCategoryData[1]; //with invalid category

      //returns array of objects containing mapped data from category name to category ID
      validCategoryWithIdItem = validIdData.categoryNameToId(
        categories,
        validCategoryData
      );
      console.log(validCategoryWithIdItem);

      await itemService.adddBulkItems(validCategoryWithIdItem); // sends the valid mapped data to database
      res.status(200).json({ message: "File uploaded successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateItem = async (req, res) => {
  let uuid = req.params.uuid;
  if (!uuid || req.body.uuid) {
    res.status(400).json({ message: "Bad Request!" });
  } else {
    itemService
      .updateItem(uuid, req.body)
      .then(() => {
        res.status(200).json({ message: "Item Updated Successfully!" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error!" });
      });
  }
};

const deleteItem = async (req, res) => {
  let uuid = req.params.uuid;

  itemService
    .deleteItem(uuid)
    .then(() => {
      res.status(200).json({ message: "Item deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = {
  getAllItems,
  adddBulkItems,
  addItem,
  updateItem,
  deleteItem,
};
