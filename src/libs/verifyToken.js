const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const config = require('../config');

const tokenCtrl = {};

tokenCtrl.verifyToken = async (req, res, next) => {
	const token = req.headers['authorization'];
	if(!token) {
		return res
		.status(401)
		.send({ auth: false, type_msg: 'failed', description: 'No token was provided' });
	}

	const decoded = await jwt.verify(token, config.SECRET_CODE);

	req.user_id = decoded.id;
	req.user_role = decoded.role;
	next();
};

module.exports = tokenCtrl;