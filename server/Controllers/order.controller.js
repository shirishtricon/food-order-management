const services = require("../Services");
const orderService = services.orderService;

const getAllOrders = async (req, res) => {
  try {
    let data = await orderService.getAllOrders();
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  try {
    let orderDetails = req.body;
    let items = JSON.stringify(req.body.items);
    let date = new Date();
    orderDetails.items = items;
    orderDetails.date = date;
    console.log(orderDetails);
    await orderService.addOrder(orderDetails);
    res.status(200).json({ message: "Order added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

module.exports = {
  addOrder,
  getAllOrders,
};
