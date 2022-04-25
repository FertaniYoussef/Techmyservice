const Router = require('express').Router();
const { Package } = require('../models/Package');
const multer  = require('multer')
const {  v4: uuidv4 } = require('uuid');
const { User } = require('../models/User');
const { Service } = require('../models/Services');
const {Order}=require('../models/Order')
const httpCodes = require('../constants/httpCodes');
const verify = require('../middleware/tokenverif');
const mongocodes = require('../constants/mongodbCodes');
const path= require('path')
const fs = require('fs')


//Generating a new name for each image
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'img/icons')
	},
	filename: function (req, file, cb) {
	  cb(null,uuidv4() + '.png')
	}
  })
const upload= multer({storage: storage})



Router.post('/:service/addpackage',upload.single('icon'), verify, async (req, res) => {
	try {
		
		
		const pack_req=JSON.parse(req.body.pack)
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		const service = await Service.findOne({ name: req.params.service });
		if (!service) return res.status(httpCodes.NO_CONTENT).send("the service doesn't exist");
		const pack_name = await Package.findOne({ name: pack_req.name });
		if (pack_name) return res.status(mongocodes.DUPLICATE_KEY).send('Package already exist');
		const package = new Package({
			name: pack_req.name,
			description: pack_req.description,
			price: pack_req.price,
			service: service._id,
			icon:'/icons/' + req.file.filename
		});

		package.save();

		return res.status(httpCodes.OK).send('Package added Succesfuly');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.get('/getpackages', async (req, res) => {
	try {
		const packages = await Package.find({}).populate('service', ['name']);
		console.log(packages)
		if (!packages) return res.status(httpCodes.NO_CONTENT).send('no package exist yet');
		return res.status(httpCodes.OK).send(packages);
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});
Router.get('/:service/getpackages', verify , async(req,res)=> {
	try {
		const packages= await Package.where({service:req.params.service}).countDocuments()
		if (!packages) return res.status(httpCodes.NO_CONTENT).send('No packages');
		return res.status(httpCodes.OK).send(JSON.stringify(packages))
	}catch(err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
})
Router.delete('/deletepackage?', verify, async (req, res) => {
	try {
		
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		console.log(req.query);
		const pack_name = await Package.findOneAndDelete({ name: req.query.name });
		

		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		const path = 'img'+pack_name.icon
		fs.unlink(path, (err) => {
			if (err) {
			  console.error(err)
			  return
			}
		  })
		const order= await Order.findOneAndUpdate({package:pack_name._id},{hasPackage:false})
		
		return res.status(httpCodes.OK).send('the package has been deleted and the order affilied with ');
	} catch (err) {
		return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });
	}
});
Router.put('/updatepackage', verify,upload.single('icon'), async (req, res) => {
	try {

		const pack_req=JSON.parse(req.body.service)
		console.log(req.body)
		const user = await User.findById(req.user._id);
		if (user.role == process.env.User || user.role == process.env.Driver)
			return res.status(httpCodes.UNAUTHORIZED).send('Access Denied');
		const pack_name = await Package.findOneAndUpdate(
			{ _id: pack_req.id },
			{ name: pack_req.name, description: pack_req.description, price: pack_req.price,icon:'/icons/' + req.file.filename }
		);
		if (!pack_name) return res.status(httpCodes.NO_CONTENT).send("the package doesn't exist");
		console.log(pack_name)
		const path='img'+pack_name.icon
		fs.unlink(path, (err) => {
			if (path===null ) {
				return
			}
			if (err) {
			  console.error(err)
			  return
			}})
		return res.status(httpCodes.OK).send('the package has been updated');
	} catch (err) {
		console.log(err)
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
});

module.exports = Router;
