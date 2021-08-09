const { Router } = require('express');
const router = Router();

const { getNews, createNews, getNew, deleteNews } = require('../controllers/news.controller');


/**
 * ruta que llama el metodo para crear una nueva noticia
 */
router.post('/news/', createNews);

/**
 * ruta que llama el metodo para cargar todas las noticias
 */
router.get('/news/:id', getNews);

/**
 * ruta que llama el metodo que filtra las noticias por categoría
 */
router.get('/news1/:id/:category_id', getNew);

// router.put('/resources/:id', updateResource);

/**
 * ruta que llama el motodo para eliminar las noticias
 */
router.delete('/news/delete', deleteNews);

module.exports = router;