const {Schema, model} = require('mongoose');

/**
 * esquema en donde se especifica las variables solicitadas por el controlador de categorías
 */
const CategorySchema = new Schema({
	name: { type: String, required: true },
	status: { type: Boolean, default: true }
}, {
	timestamps: true
});

module.exports = model('Category', CategorySchema);