const Router = require('express').Router();
const { User, Tokenmodel, Driver, Admin } = require('../models/User');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const mongodbcode = require('../constants/mongodbCodes');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');
const { Service } = require('../models/Services');
const { REPL_MODE_STRICT } = require('repl');

Router.post('/join', async (req, res) => {
	try {
		const service = await Service.findOne({ name: req.body.work })
		if (!service) return res.status(httpCodes.NO_CONTENT).send("service doesn't exist")
		const drives = await Driver.findOne({ CIN: req.body.CIN });
		if (drives) return res.status(httpCodes.UNAUTHORIZED).send('You are already a driver');
		//Hash IBAN
		/* const salt = await bcrypt.genSalt(10);
		const hashiban = await bcrypt.hash(req.body.iban, salt);
		
 */		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const driver = new Driver({
			username: req.body.username,
			email: req.body.email,
			password: hashPassword,
			phone_number: req.body.phone_number,
			country_code: req.body.country_code,
			CIN: req.body.CIN,
			Adress: req.body.Adress,
/* 			iban: hashiban,
 */			WorkAt: service._id,
			Speciality: req.body.Speciality,
			role: process.env.Driver
		});




		driver.save()

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
			subject: `User ` + user.name + ` request to work`,
			text:
				'Hello,\n\n' +
				`This is a request from the user to join the drivers of ${req.body.name}: \nhttp://` +
				req.headers.host +
				'/api/Driver/confirmation/' +
				driver._id +
				'.\n'
		};
		transporter.sendMail(mailOptions, function (err) {
			if (err) {
				return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
			}
			return res.status(httpCodes.CREATED).send('A request has been sent to techmyservice, you\'get contacted soon ');
		});


	} catch (err) {
		console.log(err);
		return res.status(httpCodes.BAD_REQUEST).send(err);
	}
});
Router.put('/updatedriver', verify, async (req, res) => {
	try {
		const user = await User.findById(req.user._id)
		let work = []
		let driver = []
		console.log(user)

		if (user.role == process.env.User)
			return res.status(httpCodes.UNAUTHORIZED).send('ACCESS DENIED')
		if (user.role ==
			process.env.Driver) {
			work = await Service.findOne({ name: req.body.work })
			if (work.length == 0) return res.status(httpCodes.NO_CONTENT).send('service do not exist')
			driver = await Driver.findByIdAndUpdate(req.user._id,
				{ username: req.body.name_2, email: req.body.email, WorkAt: work._id, phone_number: req.body.phone, Adress: req.body.adress, Speciality: req.body.specialite }
			)
			if (!driver) return res.status(httpCodes.NO_CONTENT).send('Driver do not exist')
		}
		if (user.role == process.env.Admin) {
			work = await Service.findOne({ name: req.body.work })
			if (work.length == 0) return res.status(httpCodes.NO_CONTENT).send('service do not exist')
			const admin = await Admin.findById(req.user._id)
			driver = await Driver.findOneAndUpdate({ WorkAt: work._id, CIN: req.body.CIN }, { username: req.body.name_2, email: req.body.email, WorkAt: work._id, phone_number: req.body.phone, Adress: req.body.adress, Speciality: req.body.specialite })
			if (!driver) return res.status(httpCodes.NO_CONTENT).send('Driver do not exist')
		}
		if (user.role == process.env.SuperAdmin) {
			driver = await Driver.findOneAndUpdate({ CIN: req.body.CIN }, { username: req.body.name_2, email: req.body.email, WorkAt: work._id, phone_number: req.body.phone, Adress: req.body.adress, Speciality: req.body.specialite })
			if (!driver) return res.status(httpCodes.NO_CONTENT).send('Driver do not exist')
		}

		console.log(driver)
		return res.status(httpCodes.OK).send('Driver updated')
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send(err)
	}
})
Router.delete('/deleteDriver?', verify, async (req, res) => {
	try {
		console.log(req.query)
		let driver = []
		const user = await User.findById(req.user._id)
		if (user.role == process.env.User) return res.status(httpCodes.UNAUTHORIZED).send('ACCESS DENIED')
		if (user.role ==
			process.env.Driver) {
			driver = await Driver.findOneAndDelete(req.user._id)
			if (!driver) return res.status(httpCodes.NO_CONTENT).send('Driver do not exist')
		}
		if (user.role == process.env.Admin) {
			const admin = await Admin.findById(req.user._id)
			const work = await Service.findById(admin.service)
			if (work.length == 0) return res.status(httpCodes.NO_CONTENT).send('service do not exist')
			driver = await Driver.findOneAndDelete({ WorkAt: work._id, CIN: req.query.CIN })
			if (!driver) return res.status(httpCodes.NO_CONTENT).send('Driver do not exist')
		}
		if (user.role == process.env.SuperAdmin) {
			driver = await Driver.findOneAndDelete({ CIN: req.query.CIN })
			if (!driver) return res.status(httpCodes.NO_CONTENT).send('Driver do not exist')

		}
		
		return res.status(httpCodes.OK).send('Driver deleted')
	} catch (err) {
		res.status(httpCodes.BAD_REQUEST).send(err)
	}
})
Router.get('/getDrivers', verify, async (req, res) => {
	try {
		let drivers = []

		drivers = await Driver.find({}).populate({ path: 'WorkAt', select: 'name' });


		if (!drivers) return res.status(httpCodes.NO_CONTENT).send('no drivers exist yet');


		return res.status(httpCodes.OK).send(drivers);
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send(err);
	}
})



module.exports = Router