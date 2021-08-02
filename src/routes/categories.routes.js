const { Router } = require('express');
const router = Router();

const { getCategories, createCategory, getCategory, deleteCategory, updateCategory } = require('../controllers/categories.controller');

const {isAuthenticated} = require('../helpers/auth');

/**
 * ruta para llamar al metodo que carga todas las categorías 
 */
router.get('/categories/', getCategories);

/**
 * ruta para llamar el metodo que carga una única categoría
 */
router.get('/categories/:id', getCategory);

/**
 * ruta que llama el metodo para crear una nueva categoría
 */
router.post('/categories/', createCategory);

/**
 * ruta que llama el metodo para editar una categoría
 */
router.put('/categories/:id', updateCategory);

/**
 * ruta que llama el metodo para eliminar una categoría
 */
router.delete('/categories/:id', deleteCategory);

module.exports = router;