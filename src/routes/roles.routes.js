const { Router } = require('express');
const router = Router();

const { getRole, createRole } = require('../controllers/roles.controller');

/**
 * ruta que llama el metodo para obtener todos los roles
 */
router.get('/roles/', getRole);

/**
 * ruta que llama el metodo para crear un rol nuevo
 */
router.post('/roles/', createRole);


module.exports = router;