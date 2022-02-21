/* const Router = require('express').Router();
const {User} = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongodbcode = require('../constants/mongodbCodes');
const httpCodes = require('../constants/httpCodes');

Router.post('/login/2fa/:token', async (req, res) => {
	// DATA VALIDATION
	try {
		

		if (!user) {
			return res.status(httpCodes.BAD_REQUEST).send("Email or password doesn't exist");
		}
		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) {
			return res.status(httpCodes.BAD_REQUEST).send("Email or password doesn't exist");
		}
		if (!user.isVerified)
			return res.status(httpCodes.BAD_REQUEST).send('User not verified please check your email');
		//Create and assign a token
		const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
		return res.header({'auth-token': token,'phone-number':user.phone_number}).send("Waiting for verification");
	} catch (err) {
		console.error(err);
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
	}
}); */