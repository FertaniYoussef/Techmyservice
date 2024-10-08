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


Router.post('/Adminregister',async(req,res)=> {
    try {

		const admin_name = await Admin.findOne({ CIN: req.body.CIN });
		if (admin_name) return res.status(httpCodes.UNAUTHORIZED).send('You are already an admin');
		//Hash IBAN
		/* const salt = await bcrypt.genSalt(10);
		const hashiban = await bcrypt.hash(req.body.iban, salt);
		
 */		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		const admin = new Admin({
			name: req.body.name,
            prename:req.body.prename,
			email: req.body.email,
			password: hashPassword,
			phone_number: req.body.phone_number,
			country_code: req.body.country_code,
			CIN: req.body.CIN,
			Adress: req.body.Adress,
/* 			iban: hashiban,
 */	
			role: process.env.Admin
		});




		admin.save()

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
			to: admin.email,
			subject: `User ` + admin.name + ` request to work`,
			text:
				'Hello,\n\n' +
				`This is a request from the user to join the admins of ${req.body.service} of ${req.body.name}: \nhttp://` +
				req.headers.host +
				'/api/Driver/confirmation/' +
				admin._id +
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
})
Router.put('/adminConfirmation?',verify,async(req,res)=> {
	try {
		const user = await User.findById(req.user._id)
		if (user.role != process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
       const admin = await Admin.findByIdAndUpdate(req.query.id,{isVerified:true})
	   
	   if (!admin) return res.status(httpCodes.NO_CONTENT).send('No admin with that ID exist')
	   return res.status(httpCodes.OK).send(admin)
	}catch(err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
	}	
})

Router.delete('/deleteAdmin?',verify,async(req,res)=> {
	try {
		const user = await User.findById(req.user._id)
		if (user.role != process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
       const admin = await Admin.findByIdAndDelete(req.query.ID)
	   
	   if (!admin) return res.status(httpCodes.NO_CONTENT).send('No admin with that ID exist')
	   return res.status(httpCodes.OK).send(admin)
	}catch(err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
	}
})

Router.get('/getAdmins',verify,async(req,res)=> {
	try {
		const user = await User.findById(req.user._id)
		if (user.role != process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
        const admin = await Admin.find().populate('service','name')
    

        if (!admin) return res.status(httpCodes.NO_CONTENT).send('No admin available')
        return res.status(httpCodes.OK).send(admin)
    } catch (err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }
})
Router.get('/getFreeAdmin',verify,async(req,res)=> {
	try {
		const user = await User.findById(req.user._id)
		if (user.role != process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
		const admin = await Admin.find({service:undefined})
        if (!admin) return res.status(httpCodes.NO_CONTENT).send('No admin available')
        return res.status(httpCodes.OK).send(admin)
	}catch(err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
	}
})

module.exports=Router