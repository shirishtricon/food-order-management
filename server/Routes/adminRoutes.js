const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const categoryActions = require('../Controllers/categoryActions')
const itemActions = require('../Controllers/itemActions')

app.use(cors({
    origin: '*'
}));

// APIs for categories
router.get('/categories',categoryActions.getAllCategories)
router.post('/category',categoryActions.addCategory)
router.put('/category/:id',categoryActions.updateCategory)
router.delete('/category/:id',categoryActions.deleteCategory);

//APIs for Items
router.get('/items',itemActions.getAllItems)
router.post('/item',itemActions.addItem)
router.put('/item/:id',itemActions.updateItem)
router.delete('/item/:id',itemActions.deleteItem);

module.exports = router;