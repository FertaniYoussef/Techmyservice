const Router = require('express').Router();
const httpCodes = require('../constants/httpCodes');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const { User, Tokenmodel } = require('../models/User');

Router.post('/confirmation/:token', async (req, res) => {
	// Find a matching token

	try {
		const token = await Tokenmodel.findOne({ token: req.params.token });
		if (!token)
			return res.status(httpCodes.BAD_REQUEST).send({
				type: 'not-verified',
				msg: 'We were unable to find a valid token. Your token my have expired.'
			});
		console.log(token);

		// If we found a token, find a matching user
		const user = await User.findOne({ _id: token._userId });
		console.log(user);

		if (!user)
			return res.status(httpCodes.BAD_REQUEST).send({ msg: 'We were unable to find a user for this token.' });
		if (user.isVerified)
			return res
				.status(httpCodes.BAD_REQUEST)
				.send({ type: 'already-verified', msg: 'This user has already been verified.' });

		// Verify and save the user
		user.isVerified = true;
		user.save();
		return res.status(httpCodes.OK).send('The account has been verified. Please log in.');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.post('/resend', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(httpCodes.BAD_REQUEST).send({ msg: 'We were unable to find a user with that email.' });
		if (user.isVerified)
			return res
				.status(httpCodes.BAD_REQUEST)
				.send({ msg: 'This account has already been verified. Please log in.' });

		// Create a verification token, save it, and send email
		var token = new Tokenmodel({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

		// Save the token
		token.save();

		// Send the email
		const transporter = nodemailer.createTransport({
			service: 'Gmail',
			tls: {
				rejectUnauthorized: false
			},
			port: 465,
			secure: false,
			auth: {
				user: 'youssefmehdi.fertani@etudiant-isi.utm.tn',
				pass: '12345678'
			}
		});
		const mailOptions = {
			from: 'no-reply@yourwebapplication.com',
			to: user.email,
			subject: 'Account Verification Token',
			text:
				'Hello,\n\n' +
				'Please verify your account by clicking the link: \nhttp://' +
				req.headers.host +
				'/confirmation/' +
				token.token +
				'.\n'
		};
		transporter.sendMail(mailOptions);
		return res.status(httpCodes.OK).send('A verification email has been sent to ' + user.email + '.');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});

module.exports = Router;
