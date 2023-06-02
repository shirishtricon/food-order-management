const { json } = require("body-parser");
const services = require("../Services");
const orderService = services.orderService;
const jwt = require("jsonwebtoken");
const returnItemsQuantity = require("../Utils/returnItemQuantity");

const getAllOrders = async (req, res) => {
  try {
    let data = await orderService.getAllOrders();
    let newData = returnItemsQuantity(data);
    res.status(200).json(newData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getSingleUserOrders = async (req, res) => {
  try {
    let uuid = req.params.uuid;
    let { fromDate, toDate } = req.query;
    let data = await orderService.getSingleOrder(uuid, fromDate, toDate);
    if (data.length !== 0) {
      let newData = returnItemsQuantity(data);
      res.status(200).json(newData);
    } else {
      res.status(404).json({ message: "No Transactions Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  try {
    let orderDetails = req.body;
    let user_uuid = orderDetails.user_uuid;
    let items = JSON.stringify(req.body.items);
    let date = new Date();
    orderDetails.items = items;
    orderDetails.date = date;

    //check if order exist for a particular date
    let currentDate = new Date().toISOString().slice(0, 10);
    let existingRecord = await orderService.getSingleOrderByUuidAndDate(
      user_uuid,
      currentDate
    );
    if (existingRecord) {
      const existingItems = JSON.parse(existingRecord.items);
      const updatedItems = existingItems.concat(JSON.parse(req.body.items));
      console.log(typeof req.body.items);
      delete orderDetails.user_uuid;
      orderDetails.date = currentDate;
      orderDetails.subtotal = +existingRecord.subtotal + +req.body.subtotal;
      orderDetails.items = JSON.stringify(updatedItems);
      console.log(orderDetails);
      data = await orderService.updateOrder(user_uuid, orderDetails);
    } else {
      await orderService.addOrder(orderDetails);
    }

    res.status(200).json({ message: "Order added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  addOrder,
  getAllOrders,
  getSingleUserOrders,
};
