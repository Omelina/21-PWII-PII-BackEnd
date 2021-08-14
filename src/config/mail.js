const nodemailer = require('nodemailer');

const createTrans = () => {
	const transport = nodemailer.createTransport({
		host: 'smtp.googlemail.com',
		port:465,
		auth: {
			user: "lvras.test@gmail.com",
			pass: "lcgLCG1990"
		}
	});
	return transport;
}

const mailCtrl = {};

mailCtrl.sendMailConfirmAccount = async (user) => {
	const transporter = createTrans();
	const info = await transporter.sendMail({
		from: 'NEWSCOVER 📧 <varsdev@newscover.com>',
		to: `${user.email}`,
		subject: "Account confirmation in News Cover",
		html: `<h1>News Cover</h1>
		<h4>Welcome to News Cover page</h4>
		<h4>This mail is for confirm your account</h4>
		<a href="http://localhost:3000/activate/${user._id}" >Confirm Account</a>`
	});
	return
}

mailCtrl.sendMailLogin = async (user) => {
	const transporter = createTrans();
	const info = await transporter.sendMail({
		from: 'NEWSCOVER 📧 <varsdev@newscover.com>',
		to: `${user.email}`,
		subject: "Login in News Cover",
		html: `<h1>News Cover</h1>
		<h4>Welcome to News Cover page</h4>
		<h4>This email is for the login process</h4>
		<a href="http://localhost:3000/emailLogin/${user._id}" >Login</a>`
	});
	return
}

module.exports = mailCtrl;