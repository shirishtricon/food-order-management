const db = require("../models");

const Orders = db.sequelize.models.orders;

const getAllOrders = async () => {
  const data = await Orders.findAll();
  return data;
};

const addOrder = async (orderDetails) => {
  await Orders.create(orderDetails)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = {
  addOrder,
  getAllOrders,
};
