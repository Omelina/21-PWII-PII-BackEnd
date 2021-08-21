const { NOTES_APP_SMS_TOKEN, NOTES_APP_SMS_SID, NOTES_APP_SMS_PHONE } = process.env;
const twilio = require('twilio');

const accountSid = NOTES_APP_SMS_SID;
const authToken = NOTES_APP_SMS_TOKEN;

const client = new twilio(accountSid, authToken);

const createSMS = (code) => {
	client.messages.create({
		body: `Your 2FT code is ${code}`,
		to:NOTES_APP_SMS_PHONE,
		from: '+18647772948'
	}).then((message) => console.log(`SMS ==> ENVIADO`, message.sid));
}

exports.sendSMS = (code) => createSMS(code)