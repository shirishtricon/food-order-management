const db = require('../models');

const Categories = db.sequelize.models.categories;

const getAllCategories = async(req, res) => {
    await Categories.findAll().then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: 'Internal Server Error'})
    })
};

const addCategory = async(req, res) => {
    let categoryName = req.body.categoryName;
    await Categories.create({name: categoryName})
    .then(async() => {
        const result = await Categories.findOne({order: [ [ 'id', 'DESC' ]], attributes: ['id', 'name']});
        res.status(200).json({result:result});
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'})
    })
};

const updateCategory = async(req, res) => {
    let id = req.params.id;
    if(!id || req.body.id) {
        res.status(400).json({message: 'Bad Request!'});
    } else {
        await Categories.update(req.body, {
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

const deleteCategory = async(req,res) => {
    let id = req.params.id;

    await Categories.destroy({where: {
        id: id
    }}).then(() => {
        res.status(200).json({message: 'Category deleted successfully!'})
    }).catch((err) => {
        res.status(500).json({message: 'Internal Server Error'});
    })
};

module.exports = {
    getAllCategories,
    addCategory,
    updateCategory,
    deleteCategory
}