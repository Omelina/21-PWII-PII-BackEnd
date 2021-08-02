const Role = require('../models/Role');

const rolesCtrl = {};

/**
 * Metodo para crear un rol nuevo
 * @param {solicita los datos del nuevo rol por parametro} req 
 * @param {devuelve un mensaje de exito} res 
 */
rolesCtrl.createRole = async (req, res) => {
	const { name } = req.body;
	const newRole = new Role({ name });
	await newRole.save();
	res.send({type_msg: 'success', description: 'New role.'});
};

/**
 * Metodo para obtener todos los roles existentes
 * @param {*} req 
 * @param {devuelve una lista de roles} res 
 */
rolesCtrl.getRole = async (req, res) => {
	const roles = await Role.find();
	res.send(roles);
};

module.exports = rolesCtrl;