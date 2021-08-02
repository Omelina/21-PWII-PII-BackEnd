const Category = require('../models/Category');
const Resource = require('../models/Resource');
const User = require('../models/User');
const News = require('../models/New');
const { createNews, deleteNews } = require('./news.controller');

const resourcesCtrl = {};

/**
 * Metodo para crear noticias
 * @param {Solicita los datos del nuevo recurso mediante el body} req 
 * @param {Devuelve un mensaje de exito o error} res 
 */
resourcesCtrl.createResource = async (req, res) => {
	const { name, url, category_id, user_id} = req.body;
	const newResource = new Resource({url, name, user_id, category_id});
	await newResource.save();
	const resource_id = newResource._id;
	callNews(url, resource_id, user_id, category_id);
	res.send({type_msg: 'success', description: 'New resource.'});
};

/**
 * Función que llama el metodo para crear noticias
 * @param {recibe el url del recurso por parametro} url 
 * @param {recibe el id del recurso} resource_id 
 * @param {recibe el id del usuario logeado} user_id 
 * @param {recibe el id de la categoría asociada al recurso} category_id 
 */
async function callNews(url, resource_id, user_id, category_id) {
	try{
		const body = {
			url: url,
			resource_id : resource_id,
			user : user_id,
			category : category_id
		};
		await createNews(body);
	}catch(err){
		console.log(err);
	}
}

/**
 * Metodo para actualizar un recurso 
 * @param {solicida los datos del nuevo recurso mediante el body, y el id del 
 * recurso a actualizar} req 
 * @param {decuelve un mensaje de exito} res 
 */
resourcesCtrl.updateResource = async (req, res) => {
	const { url, name, category } = req.body;
	await Resource.findByIdAndUpdate(req.params.id, {url, name, category})
	res.send({type_msg: 'success', description: 'Updated resource.'});
};

/**
 * Metodo para eliminar un recurso
 * @param {solicita el id de la noticia a eliminar} req 
 * @param {envía un mensaje de exito} res 
 */
resourcesCtrl.deleteResource = async (req, res) => {
	const status = false;
	await Resource.findByIdAndUpdate(req.params.id, {status})
	deleteNews(status);
	res.send({type_msg: 'success', description: 'Deleted resource.'});
};

/**
 * Metodo para obtener todos los recursos
 * @param {} req 
 * @param {devuelve la lista de recursos} res 
 */
resourcesCtrl.getResources = async (req, res) => {
	const listResources = [];
	const resources = await Resource.find();
	resources.forEach(element => {
		if (element.status === true && element.user_id === req.params.id){
			listResources.push(element);
		}
	});
	res.send(listResources);
};

/**
 * Metodo para buscar una única categoría
 * @param {Se requiere el id de el recurso a buscar} req 
 * @param {devuelve el recurso solicitado} res 
 */
resourcesCtrl.getResource = async (req, res) => {
	const resource = await Resource.findById(req.params.id);
	res.send(resource);
};

/**
 * Función que actualiza todas las noticias, con todos los recursos
 * @param {*} req 
 * @param {devuelve un mensaje de exito} res 
 */
resourcesCtrl.actualizarN = async (req, res) => {
	const status = false;
	const resources = await Resource.find();
	resources.forEach(element => {
		deleteNews(status)
		callNews(element.url, element._id, element.user_id, element.category_id)
	});
	res.send({type_msg: 'success', description: 'Updated news.'});
};

module.exports = resourcesCtrl;