const db = require('../models');

const Items = db.sequelize.models.items;

const getAllItems = async() => {
    const data = await Items.findAll();
    return data;
};

const addItem = async(ItemDetails) => {
    await Items.create(ItemDetails)
    const data = await Items.findOne({order: [ [ 'id', 'DESC' ]], attributes: ['id', 'name']});
    return data;
    
}

const updateItem = async(id, body) => {
    await Items.update(body, {
        where: {
            'id': id
        }
    });
}

const deleteItem = async(id) => {
    await Items.destroy({where: {id: id}})
}

module.exports = {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
}