const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Esquema en donde se especifica las variables solicitadas por el controlador de noticias
 */
const UserSchema = new Schema({
	email: { type: String, required: true},
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: true },
	status: { type: Boolean, default: true },
	role: { type: String, required: true },
	tft: { type: String }
}, {
	timestamps: true
});

/**
 * Función que encripta la contraseña del usuario
 * @param {recibe la contraseña a encriptar por parametro} password 
 * @returns la contraseña encriptada para que sea almacenada
 */
UserSchema.methods.encryptPassword = async password => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

/**
 * Función que ayuda a comparar la contraseña ingresada por el usuario por la almacenada en la base de datos
 * @param {recibe la contraseña ingresada por el usuario} password 
 * @returns la contraseña encriptada
 */
UserSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
}

module.exports = model('User', UserSchema);