const User = require('../models/User');
const Role = require('../models/Role');
const jwt = require('jsonwebtoken');
const { SECRET_CODE } = process.env;
const config = require('../config');

const passport = require('passport');

const usersCtrl = {};

/**
 * metodo para registrar un usuario nuevo, el cual encripta la contraseña 
 * @param {solicita los datos del nuevo usuario mediante el body} req 
 * @param {devuelve un mensaje de exito o fallo} res 
 */
usersCtrl.singup = async (req, res) => {
	const {
		firstName,
		lastName,
		email,
		password
	} = req.body;

	if (password.length < 4) {
		res.send({type_msg: 'failed', description: 'Passwords must be at least 4 characters.'});
	} else {
		const emailUser = await User.findOne({
			email: email
		});
		if (emailUser) {
			res.send({type_msg: 'failed', description: 'The Email is already in use.'});
		} else {
			const newUser = new User({
				firstName,
				lastName,
				email,
				password,
				status: false
			});
			newUser.role = "client";
			newUser.password = await newUser.encryptPassword(password)
			await newUser.save();
			res.send({type_msg: 'success', description: 'You are registered.'});
		}
	}
};

usersCtrl.activate = (req, res) => {
	
	res.send({type_msg: 'success', description: 'You are logout.'});
};

/**
 * metodo para iniciar sesion 
 * @param {solicita el metodo logIn} req 
 * @param {devuelve el usuario} res 
 * @param {*} next 
 */
usersCtrl.singin = async (req, res, next) => {
	passport.authenticate('local', function(err, user, info){
		if (err) { return next(err); }
		req.logIn(user, function(err) {
			if (err) { return res.send({type_msg: 'failed', description: 'Login failed'}) }
				const token = jwt.sign({id: user._id, role: user.role}, config.SECRET_CODE, {
					expiresIn: 60 * 60 * 24,
				});
				return res.json({ auth: true, token });
				// return res.send({user});
				// return res.send({type_msg: 'success', description: user.id});
		});
	})(req, res, next);
}

usersCtrl.twoFactorAuth = (req, res) => {
	
	res.send({type_msg: 'success', description: 'You are logout.'});
};

usersCtrl.emailLogin = (req, res) => {
	
	res.send({type_msg: 'success', description: 'You are logout.'});
};

/**
 * Metodo para cerrar sesión 
 * @param {solicita el metodo de logout} req 
 * @param {devuelve un mensaje de exito} res 
 */
usersCtrl.logout = (req, res) => {
	req.logout();
	res.status(200).send({ auth: false, token: null });
	res.send({type_msg: 'success', description: 'You are logout.'});
};

/**
 * Metodo para obtener todos los usuarios
 * @param {*} req 
 * @param {Devuelve una lista de usuarios} res 
 */
usersCtrl.getUsers = async (req, res) => {
	const users = await User.find();
	res.send(users);
};

/**
 * Metodo para cargar un único usuario
 * @param {solicita el id del usuario a buscar} req 
 * @param {devuelve el usuario solicitado} res 
 */
usersCtrl.getUserbyId = async (req, res) => {
	const user = await User.findById(req.params.id);
	res.send(user);
};

module.exports = usersCtrl;