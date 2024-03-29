const { where } = require("sequelize");
const db = require("../models");
const { Op } = require("sequelize");

const Orders = db.sequelize.models.orders;

const getAllOrders = async () => {
  const data = await Orders.findAll();
  return data;
};

const getSingleOrder = async (uuid, fromDate, toDate) => {
  try {
    let data = await Orders.findAll({
      where: {
        user_uuid: uuid,
        date: {
          [Op.between]: [fromDate, toDate],
        },
      },
    });
    if (data.user_uuid) {
      let SingleObjectData = [];
      SingleObjectData.push(data);
      return SingleObjectData;
    } else {
      return data;
    }
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
};

const getSingleOrderByUuidAndDate = async (user_uuid, date) => {
  try {
    let data = await Orders.findOne({
      where: { user_uuid: user_uuid, date: date },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
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

const updateOrder = async (user_uuid, details) => {
  await Orders.update(
    {
      items: details.items,
      subtotal: details.subtotal,
      updatedAt: details.updatedAt,
    },
    {
      where: { user_uuid: user_uuid, date: details.date },
    }
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  addOrder,
  getSingleOrderByUuidAndDate,
  getAllOrders,
  updateOrder,
  getSingleOrder,
};
