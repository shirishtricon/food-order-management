const services = require("../Services");

const itemService = services.itemService;

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
  addItem,
  updateItem,
  deleteItem,
};
