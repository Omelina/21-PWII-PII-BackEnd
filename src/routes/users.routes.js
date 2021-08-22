const { Router } = require('express');
const router = Router();

const { singup, singin, logout, getUsers, getUserbyId, activate, emailLogin, sendEmailLogin, twoFactorAuth } = require('../controllers/users.controller');

/**
 * ruta que llama el metodo para crear un nuevo usuario
 */
router.post("/users/singup", singup);

/**
 * ruta que llama el metodo para iniciar sesion
 */
router.post("/users/singin", singin);

/**
 * ruta que llama el metodo para cerrar sesion
 */
router.get("/users/logout", logout);

/**
 * ruta que llama el metodo para autenticarse por dos factores
 */
router.post("/tft", twoFactorAuth);

/**
 * ruta que llama el metodo para enviar correo para login
 */
router.post("/sendEmailLogin", sendEmailLogin);

/**
 * ruta que llama el metodo para crear JWT luego de login por email
 */
router.get("/emailLogin/:id", emailLogin);

/**
 * ruta que llama el metodo para activar la cuenta de usuario
 */
router.get("/activate/:id", activate);

/**
 * ruta que llama el metodo para cargar todos los usuarios
 */
router.get('/users/', getUsers);

/**
 * ruta que llama el motodo para cargar un unico usuario
 */
router.get('/users/:id', getUserbyId);

module.exports = router;