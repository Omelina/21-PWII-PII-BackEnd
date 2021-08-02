const { Router } = require('express');
const router = Router();

const { createResource, getResources, updateResource, deleteResource, getResource } = require('../controllers/resources.controller');

const {isAuthenticated} = require('../helpers/auth');
/**
 * ruta que llama el metodo para crear un nuevo recurso
 */
router.post('/resources/', createResource);

/**
 * ruta que llama el metodo para obtener todos los recursos
 */
router.get('/resources/:id', getResources);

/**
 * ruta para llamar el metodo que carga un unico recurso
 */
 router.get('/resource/:id', getResource);

/**
 * ruta que llama el metodo para actualizar un recurso
 */
router.put('/resources/:id', updateResource);

/**
 * ruta que llama el metodo para eliminar un recurso
 */
router.delete('/resources/:id', deleteResource);

module.exports = router;