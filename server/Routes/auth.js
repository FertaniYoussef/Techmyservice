const Router = require('express').Router();
const { User, Tokenmodel } = require('../models/User');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const mongodbcode = require('../constants/mongodbCodes');
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');

Router.post('/register', async (req, res) => {
	try {
		//Check if email already exist
		const emailExist = await User.findOne({ email: req.body.email });
		if (emailExist) return res.status(mongodbcode.DUPLICATE_KEY).send('Email Already Exist');
		//Hash passwords
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		//Create the new user
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashPassword,
			phone_number: req.body.phone_number,
			country_code: req.body.country_code,
			Birthday: req.body.Birthday
		});
		//	Save it into ther database
		user.save();

		//	Create confirmation token for user
		const token = new Tokenmodel({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

		//	Save the verification token
		token.save(function(err) {
			if (err) {
				return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
			}
		});

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
				'/api/verification/confirmation/' +
				token.token +
				'.\n'
		};
		transporter.sendMail(mailOptions, function(err) {
			if (err) {
				return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
			}
			return res.status(httpCodes.CREATED).send('A verification email has been sent to ' + user.email + '.');
		});
	} catch (err) {
		res.status(httpCodes.BAD_REQUEST).send(err);
	}
});

Router.post('/login', async (req, res) => {
	// DATA VALIDATION
	try {
		//Check if email is present and password valid
		const user = await User.findOne({ email: req.body.email });

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
		return res
			.header({ 'auth-token': token, 'phone-number': user.phone_number })
			.status(httpCodes.ACCEPTED)
			.send({ user, token });
	} catch (err) {
		console.error(err);
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
	}
});
Router.get('/', verify, async (req, res) => {
	try {
		let user = await User.findById(req.user._id);
	
		
		if (!user) return res.status(httpCodes.UNAUTHORIZED) 
		if (user.role==process.env.Admin) {
			user = await Admin.findById(user._id).populate('service','name')
		}
		
		return res.status(httpCodes.OK).send(user);
	} catch (err) {
		res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
	}
});

Router.put('/changeProfile', verify, async (req, res) => {
	try {
		const user = await User.findById(req.user._id);

		if (!user) {
			return res.status(httpCodes.NO_CONTENT).send(" User doesn't exist");
		}
		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) {
			return res.status(httpCodes.UNAUTHORIZED).send('wrong password');
		}
		console.log(validPass);
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.modification.password, salt);
		const modifiedUser = await User.findByIdAndUpdate(req.user._id, {
			email: req.body.modification.email,
			Birthday: req.body.modification.Birthday,
			password: hashPassword
		});

	return 	res.status(httpCodes.OK).send(modifiedUser);
	} catch (err) {
		res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
	}
});

Router.post('/changepassword',async(req,res)=> {
	try {	
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const user= await User.findOneAndUpdate({email:req.body.email},{password:hashPassword})
		console.log(user);
		
		if (!user ) return res.status(httpCodes.NO_CONTENT).send(" User doesn't exist");

		return res.status(httpCodes.OK).send('user modified')
	}catch(err) {
		res.status(httpCodes.INTERNAL_SERVER_ERROR).send({msg:err})
	}
})

Router.post('/forgottenpassword', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(httpCodes.NO_CONTENT).send("user with given email doesn't exist");
		
		let token = await Tokenmodel.findOne({ _userId: user._id });
		if (!token) {
			token = new Tokenmodel({
				_userId: user._id,
				token: crypto.randomBytes(3).toString('hex').substr(0,6)
			})
			
			
			token.save(function(err) {
				if (err) {
					return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
				}
			})
		}
		
		
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
				subject: 'Password reset',
				text:
					'Hello,\n\n' +
					'Please reset your password by typing the code below\n'+
					token.token+'.\n'
			};
			
			transporter.sendMail(mailOptions, function(err) {
				if (err) {
					
					return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
				}
				
				return res.status(httpCodes.OK).send('A verification email has been sent to ' + user.email + '.');
		})
		
	}
	 catch (err) {
		 console.log({msg:err.message});
		 
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err);
	}
});
module.exports = Router;
