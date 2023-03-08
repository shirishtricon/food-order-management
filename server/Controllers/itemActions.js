const db = require('../models');

const Categories = db.sequelize.models.categories;
const Items = db.sequelize.models.items;

const getAllItems = async(req, res) => {
    await Items.findAll().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'})
    })
};

const addItem = async(req, res) => {
    Items.create(req.body).then(async() => {
        const data = await Items.findOne({order: [ [ 'id', 'DESC' ]], attributes: ['id', 'name']});
        res.status(200).json({result:data})
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'})
    })
};

const updateItem = async(req, res) => {
    let id = req.params.id;
    if(!id || req.body.id) {
        res.status(400).json({message: 'Bad Request!'});
    } else {
        await Items.update(req.body, {
            where: {
                'id': id
            }
        }).then(() => {
            res.status(200).json({message: 'Category Updated Successfully!'});
        }).catch((err) => {
            res.status(500).json({message: 'Internal Server Error!'})
        })
    }
};

const deleteItem = async(req,res) => {
    let id = req.params.id;

    await Items.destroy({where: {
        id: id
    }}).then(() => {
        res.status(200).json({message: 'Category deleted successfully!'})
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'});
    })
};

module.exports = {
    getAllItems,
    addItem,
    updateItem,
    deleteItem
}