const db = require("../models");
const services = require("../Services");

const getAllCategories = async (req, res) => {
  try {
    const data = await services.categoryService.getAllCategories();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCategory = async (req, res) => {
  try {
    let name = req.body.categoryName;
    const data = await services.categoryService.addCategory(name);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    if (!uuid || req.body.uuid) {
      res.status(400).json({ message: "Bad Request!" });
    } else {
      const data = await services.categoryService.updateCategory(
        uuid,
        req.body
      );
      res.status(200).json({ message: "Category Updated Successfully!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    const data = services.categoryService.deleteCategory(uuid);
    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
