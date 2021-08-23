const Category = require('../models/Category');
const Resource = require('../models/Resource');
const User = require('../models/User');
const News = require('../models/New');
const Parser = require('rss-parser');

const newsCtrl = {};

/**
 * Metodo que llama todas las noticias 
 * @param {solicita el usuario logeado} req 
 * @param {devuelve una lista de noticias} res 
 */
newsCtrl.getNews = async (req, res) => {
	const listNews= [];
	const news = await News.find();
    id = req.params.id;
	news.forEach(element => {
		if (element.status === true && element.user_id === id){
			listNews.push(element);
		}
	});
	res.send(listNews);
};

/**
 * Metodo para crear noticias dinamicamente
 * @param {Obtiene los datos para crear la noticia por parametro } body 
 */
newsCtrl.createNews = async (body) => {
    let parser = new Parser();
    const feed = await parser.parseURL(body.url);
    let count = 0;
    feed.items.forEach(item => {
        if(count <= 11){
            const news = {
                title: item.title,
                description: item.content.substring(0,200),
                permanlink: item.link,
                category: item.categories[0],
                date: item.pubDate,
                resource_id: body.resource_id,
                user_id: body.user,
                category_id: body.category
            };
            const newNews = new News(news);
            newNews.save();
        }
        count++;
    });
};

/**
 * Metodo que cambia la disponibilidad de una noticia
 * @param {Se le envía el estado a cambiar} status 
 */
newsCtrl.deleteNews = async (status) => {
    const news = await News.find()
    for (const element of news) {
        await News.findByIdAndUpdate(element._id, {status})
	};
};

/**
 * Metodo para obtener la categoría de la noticia
 * @param {solicita el id de la categoría que puede estar asociada a algunas noticias} req 
 * @param {devuelve una lista de noticias} res 
 */
newsCtrl.getNew = async (req, res) => {
    const cat = await Category.findById(req.params.category_id);
    console.log(cat.id);
    const neww = await News.aggregate([
        {
            $lookup:{
                from: "categories",
                pipeline:[{
                    $match: {
                        $expr:{"category_id": cat.id
                        }
                    }
                }],
                as: "categoria"
            }
        }
    ]
    )
	res.send(neww);
};

module.exports = newsCtrl;