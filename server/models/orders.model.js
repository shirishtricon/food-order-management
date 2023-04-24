const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define("orders", {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "uuid",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    items: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,

      allowNull: false,
    },
  });
  return orders;
};
