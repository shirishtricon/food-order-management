
module.exports = (sequelize, DataTypes) => {
    const categories = sequelize.define('categories', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },

        id: {
            unique: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },         
    {
        timestamps: false
    });
    return categories;
}