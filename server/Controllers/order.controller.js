const services = require("../Services");
const orderService = services.orderService;
const jwt = require("jsonwebtoken");

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
    let token = req.headers.token;
    let user_uuid = jwt.decode(token).uuid;
    let items = JSON.stringify(req.body.items);
    let date = new Date();
    orderDetails.items = items;
    orderDetails.date = date;
    orderDetails.user_uuid = user_uuid;

    //check if order exist for a particular date
    const currentDate = new Date().toISOString().slice(0, 10);
    const existingRecord = await orderService.getSingleOrderByUuidAndDate(
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
};
