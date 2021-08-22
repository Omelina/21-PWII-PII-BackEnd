const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mail = require('../config/mail');
const sms = require('../config/sms');

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
			const user = await newUser.save();
			mail.sendMailConfirmAccount(user);
			res.send({type_msg: 'success', description: 'You are registered.'});
		}
	}
};

/**
 * Metodo para activar la cuenta de usuario
 * @param {solicita metodo de activacion de cuenta} req 
 * @param {devuelve mensaje de exito} res 
 */
usersCtrl.activate = async (req, res) => {
	const status = true;
	await User.findByIdAndUpdate(req.params.id, {status})
	res.send({type_msg: 'success', description: 'Your account is confirm.'});
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
			if (err) { return res.send({type_msg: 'failed', description: info}) }
			usersCtrl.sendTFT(user._id);
			res.send({type_msg: 'success', description: '2FT'});
		});
	})(req, res, next);
}

/**
 * Metodo para login por autenticacion de dos factores
 * @param {solicita el metodo de 2FT} req 
 * @param {devuelve un mensaje  o un JWT} res 
 */
usersCtrl.twoFactorAuth = async (req, res) => {
	const { tft } = req.body;
	const user = await User.findOne({tft});
	if(user != null){
		const token = jwt.sign({id: user._id, role: user.role}, config.SECRET_CODE, {
			expiresIn: 60 * 60 * 24,
		});
		return res.json({ auth: true, token, user });
	} else {
		res.send({type_msg: 'failed', description: '2FT code incorrect.'});
	}
};

/**
 * Genera el codigo de 2FT y lo envia
 * @param {identificador del usuario} id 
 */
usersCtrl.sendTFT = async (id) => {
	const user = await User.findById(id);
	txt1 = user.firstName.slice(-2);
	txt2 = user.lastName.slice(-2);
	nr1 = Math.floor(Math.random() * 10);
	nr2 = Math.floor(Math.random() * 10);
	tft = txt1+txt2+nr1+nr2;
	await User.findByIdAndUpdate(id, {tft})
	sms.sendSMS(tft);
}

/**
 * Metodo para enviar correo para login
 * @param {solicita el metodo de envio de correo para login} req 
 * @param {devuelve un mensaje} res 
 */
usersCtrl.sendEmailLogin = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({email});
	mail.sendMailLogin(user);
	res.send({type_msg: 'success', description: 'Mail send.'});
};

/**
 * Metodo para login por correo
 * @param {solicita el metodo de login por correo} req 
 * @param {devuelve un mensaje o un JWT} res 
 * @returns 
 */
usersCtrl.emailLogin = async (req, res) => {
	const user = await User.findById(req.params.id);
	if(user.status){
		const token = jwt.sign({id: user._id, role: user.role}, config.SECRET_CODE, {
			expiresIn: 60 * 60 * 24,
		});
		return res.json({ auth: true, token });
	}
	return res.send({type_msg: 'failed', description: 'Account is not confirm.'});
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