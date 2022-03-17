const Router = require('express').Router();
const { User, Tokenmodel, Driver } = require('../models/User');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const mongodbcode = require('../constants/mongodbCodes');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');

Router.post('/join', verify, async (req, res) => {
	try {
		const drives = await Driver.findOne(req.body.CIN);
		if (drives) return res.status(httpCodes.UNAUTHORIZED).send('You are already a driver');
		//Hash IBAN
		/* const salt = await bcrypt.genSalt(10);
		const hashiban = await bcrypt.hash(req.body.iban, salt);
 */
		const driver = new Driver({
			username: req.body.username,
			email: req.body.email,
			password: hashPassword,
			phone_number: req.body.phone_number,
			country_code: req.body.country_code,
			CIN: req.body.CIN,
			Adress: req.body.Adress,
/* 			iban: hashiban,
 */			Workat: req.body.work,
			Specialité: req.body.Specialité
        });
        driver.save();
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
			subject: `User `+user.name+` request to work`,
			text:
				'Hello,\n\n' +
				`This is a request from the user to join the drivers of ${req.body.name}: \nhttp://` +
				req.headers.host +
				'/api/Driver/confirmation/' +
				driver._id +
				'.\n'
		};
		transporter.sendMail(mailOptions, function(err) {
			if (err) {
				return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
			}
			return res.status(httpCodes.CREATED).send('A request has been sent to techmyservice, you\'get contacted soon ');
		});


	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send(err);
	}
});



module.exports=Router