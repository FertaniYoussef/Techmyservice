const Router = require('express').Router();
const { Service } = require('../models/Services');
const { User,Admin } = require('../models/User')
const multer  = require('multer')
const {  v4: uuidv4 } = require('uuid');
const httpCodes = require('../constants/httpCodes');
const mongocodes = require('../constants/mongodbCodes')
const verify = require('../middleware/tokenverif')
const path= require('path')
const fs = require('fs');
const { Package } = require('../models/Package');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, 'img/icons')
	},
	filename: function (req, file, cb) {
	  cb(null,uuidv4() + '.png')
	}
  })
const upload= multer({storage: storage})



Router.post('/addservice', upload.single('icon'),verify, async (req, res) => {
    try {
        const serv= JSON.parse(req.body.service)
        console.log(serv)
        const user = await User.findById(req.user._id)
        
        if (user.role != process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
       
        const service_name = await Service.findOne({ name: serv.name })
        if (service_name) return res.status(mongocodes.DUPLICATE_KEY).send('Service already exist')
        const service = new Service({
            name: serv.name,
            description: serv.description,
            adress: serv.adress,
            geoposition: {coordinates : [serv.lng,serv.lat] },
            icon: '/icons/' + req.file.filename
        });
        console.log(service)
        service.save()
        return res.status(httpCodes.OK).send('Service added Succesfuly')
    } catch (err) { return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message }); }
})
Router.get('/getservice/:id', async (req, res) => {
    try {

        const service = await Service.findById(req.params.id)
        console.log(service);

        if (!service) return res.status(httpCodes.NO_CONTENT).send('service doesn\'t exist')
        return res.status(httpCodes.OK).send(service.name)
    } catch (err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }
})
Router.get('/getservices', verify, async (req, res) => {
    try {
        const service = await Service.find().populate('admin', 'name prename')
        console.log(service);

        if (!service) return res.status(httpCodes.NO_CONTENT).send('service doesn\'t exist')
        return res.status(httpCodes.OK).send(service)
    } catch (err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }
})
Router.put('/modifyservice/:id',upload.single('icon'), verify, async (req, res) => {
    try {
        const service_req=JSON.parse(req.body.service)
        const admin=JSON.parse(req.body.admin)
        
        let service = []
        let administration = false
        if (admin != '') {
            const admin_name = await Admin.findOne({ name: admin });
            if (!admin_name) return res.status(httpCodes.NO_CONTENT).send("User doesn't exist");
            administration = true
            console.log(admin_name)
            service = await Service.findOneAndUpdate({ _id: req.params.id }, { name: service_req.name, description:service_req.description, admin: admin_name._id, adress: service_req.adress, hasAdmin: administration,icon:'/icons/' + req.file.filename  });
            
            }
        else { service = await Service.findOneAndUpdate({ _id: req.params.id  }, { name:service_req.name, description: service_req.description, adress: service_req.adress, hasAdmin: administration,icon:'/icons/' + req.file.filename  }) };


        if (!service) return res.status(httpCodes.NO_CONTENT).send("service doesn't exist");
        const path='img'+service.icon
		fs.unlink(path, (err) => {
			if (service.icon===null ) {
				return
			}
			if (err) {
			  console.error(err)
			  return
			}})
            const admin_upd=await Admin.findById(service.admin,{service:service._id})
        return res.status(httpCodes.OK).send('the service has been updated');
    } catch (err) {
        return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
    }
});
Router.put('/assignservice',verify,async(req,res)=> {

})
Router.delete('/deleteService?', verify, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user.role != process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')

        const service = await Service.findOneAndDelete({ _id: req.query.id })
        if (!service) return res.status(httpCodes.NO_CONTENT).send("service doesn't exist");
        const pack=await Package.deleteMany({service:req.params.id})
        console.log(pack)
        return res.status(httpCodes.OK).send('the service has been deleted');

    } catch (err) {
        return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
    }
})



module.exports = Router