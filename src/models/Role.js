const {Schema, model} = require('mongoose');

/**
 * Esquema en donde se especifica las variables solicitadas por el controlador de roles
 */
const RoleSchema = new Schema({
	name: { type: String, required: true }
}, {
	timestamps: true
});

module.exports = model('Role', RoleSchema);