const {Schema, model} = require('mongoose');

/**
 * Esquema en donde se especifica las variables solicitadas por el controlador de noticias
 */
const NewsSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String},
	permanlink: { type: String, required: true },
	status: { type: Boolean, default: true },
	date: { type: Date, required: true },
	resource_id: { type: Object, required: true },
	user_id: { type: Object, required: true },
	category_id: { type: Object, required: true }
}, {
	timestamps: true
});


module.exports = model('News', NewsSchema);