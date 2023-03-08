const db = require("../models");
const services = require("../Services");

const getAllCategories = async (req, res) => {
  await services.categoryService
    .getAllCategories()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const addCategory = async (req, res) => {
  let categoryName = req.body.categoryName;
  await categoryService
    .addCategory(categoryName)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

const updateCategory = async (req, res) => {
  let id = req.params.id;
  if (!id || req.body.id) {
    res.status(400).json({ message: "Bad Request!" });
  } else {
    categoryService
      .updateCategory(id, req.body)
      .then(() => {
        res.status(200).json({ message: "Category Updated Successfully!" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Internal Server Error!" });
      });
  }
};

const deleteCategory = async (req, res) => {
  let id = req.params.id;

  categoryService
    .deleteCategory(id)
    .then(() => {
      res.status(200).json({ message: "Category deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};

module.exports = {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
};
