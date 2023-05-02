module.exports = (sequelize, DataTypes) => {
  const invaliditems = sequelize.define(
    "invaliditems",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ratings: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      category_uuid: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  return invaliditems;
};
