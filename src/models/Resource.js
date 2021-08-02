const {Schema, model} = require('mongoose');

/**
 * Esquema en donde se especifica las variables solicitadas por el controlador de recursos
 */
const ResourceSchema = new Schema({
	url: { type: String, required: true },
	name: { type: String, required: true },
	status: { type: Boolean, default: true },
	user_id: { type: Object, required: true },
	category_id: { type: Object, required: true }
}, {
	timestamps: true
});

module.exports = model('Resource', ResourceSchema);