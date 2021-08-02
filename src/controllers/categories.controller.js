const Category = require('../models/Category');
const Role = require('../models/Role');

const categoriesCtrl = {};

/**
 * Metodo utilizado para crear una categoría nueva
 * @param {body con el nombre solicitado} req 
 * @param {response con mensaje de exito o fallo} res 
 */
categoriesCtrl.createCategory = async (req, res) => {
	const { name } = req.body;
		const categorySearch = await Category.findOne({name: name});
		if (categorySearch) {
			res.send({type_msg: 'failed', description: 'The category is already in use.'});
		} else {
			const newCategory = new Category({ name });
			await newCategory.save();
			res.send({type_msg: 'success', description: 'New category.'});
		}
	res.send({type_msg: 'failed', description: 'Restricted access.'});
};

/**
 * Metodo utilizado para cargar todas las categorías
 * @param {*} req 
 * @param {response con la lista de categorías} res 
 */
categoriesCtrl.getCategories = async (req, res) => {
	const listCategories = [];
	const categories = await Category.find();
	categories.forEach(element => {
		if (element.status === true){
			listCategories.push(element);
		}
	});
	res.send(listCategories);
};

/**
 * Metodo para buscar una única categoría
 * @param {Se requiere el id de la categoría a buscar} req 
 * @param {devuelve la categoría solicitada} res 
 */
categoriesCtrl.getCategory = async (req, res) => {
	const category = await Category.findById(req.params.id);
	res.send(category);
};

/**
 * Metodo utilizado para eliminar una categoría
 * @param {Solicita el id de la categoría a eliminar} req 
 * @param {devuelve un mensaje de exito} res 
 */
categoriesCtrl.deleteCategory = async (req, res) => {
	const status = false;
	await Category.findByIdAndUpdate(req.params.id, {status})
	res.send({type_msg: 'success', description: 'Desactivated category.'});
};

/**
 * metodo utilizado para actua.lizar una categoría
 * @param {solicita el id de la categoría} req 
 * @param {devuelve un mensaje de exito} res 
 */
categoriesCtrl.updateCategory = async (req, res) => {
	const { name } = req.body;
	await Category.findByIdAndUpdate(req.params.id, {name})
	res.send({type_msg: 'success', description: 'Updated category.'});
};

module.exports = categoriesCtrl;