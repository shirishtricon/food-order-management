const services = require("../Services");
const xlsx = require("xlsx");
const itemService = services.itemService;
const invalidItemService = services.invalidItemService;
const categoryService = services.categoryService;
const ifArrayEqual = require("../Utils/ifAllDataEqual");
const returnCategoryArray = require("../Utils/returnCategoryArray");
const mapNameToId = require("../Utils/changeCategoryNameToId");
const { items } = require("../models");
const returnData = require("../Utils/returnData");
const getExtension = require("../Utils/getExtension");

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
  let items = req.body;
  for (const property in items) {
    if (items[property] === "") {
      delete items[property];
    }
  }
  console.log(items);
  try {
    const data = await itemService.addItem(items);
    res.status(200).json(data.dataValues);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const adddBulkItems = async (req, res) => {
  const file = req.file;
  const fileName = file.originalname;
  let extension = getExtension.getFileExtension(fileName);

  //for parsing the Excel data
  const workbook = xlsx.read(file.buffer);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(worksheet); // JSON data

  try {
    if (extension === "xlsx" || extension === "csv") {
      validAndInvalidData = await returnData.returnValidAndInvalidData(data);
      let validData = validAndInvalidData[0];
      let invalidData = validAndInvalidData[1];

      if (validData) {
        let validDataWithMappedId = await mapNameToId.categoryNameToUuid(
          validData
        );
        await itemService.adddBulkItems(validDataWithMappedId);
      }

      if (invalidData) {
        await invalidItemService.addInvalidItem(invalidData);
      }
      res.status(200).json({ message: "File Uploaded Successfully!" });
    } else {
      throw Error("invalidFile");
    }
  } catch (err) {
    console.log(err.message);
    if (err.message === "invalidFile") {
      // check for the specific error
      res.status(400).json({ message: "Invalid file" });
    } else {
      console.log(err);
      res.status(500).json({ message: "Internal Server error" });
    }
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
