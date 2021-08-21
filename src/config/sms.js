const twilio = require('twilio');

const accountSid = 'AC16160de6267d1b7458b40b4f43433064';
const authToken = '129ec44aae312136620d69ecef3eb65b';

const client = new twilio(accountSid, authToken);

const createSMS = (code) => {
	client.messages.create({
		body: `Your 2FT code is ${code}`,
		to:'+50686714190',
		from: '+18647772948'
	}).then((message) => console.log(`SMS ==> ENVIADO`, message.sid));
}

exports.sendSMS = (code) => createSMS(code)