const Router = require('express').Router();
const  {Service}= require('../models/Services');
const {User}= require('../models/User')
const httpCodes = require('../constants/httpCodes');
const mongocodes= require('../constants/mongodbCodes')
const verify=require('../middleware/tokenverif')

Router.post('/addservice',verify,async(req,res)=> {
    try {
        const user= await User.findById(req.user._id)
        
        if (user.role!=process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
        console.log(req.body)
        const admin_name= await User.findOne({username:req.body.admin})
        if (!admin_name) return res.status(httpCodes.NO_CONTENT).send('user do not exist')
        const service_name = await Service.findOne({name:req.body.name})
        if (service_name) return res.status(mongocodes.DUPLICATE_KEY).send('Service already exist')
        const administrateur=req.body.admin
        console.log(admin_name)
        const service = new Service({
            name: req.body.name,
            description:req.body.description,
            admin:admin_name._id,
            adress: req.body.adress
        });
        
       service.save()
        return res.status(httpCodes.OK).send('Service added Succesfuly')
    }catch(err) {return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ msg: err.message });}
})
Router.get('/getservice/:id',async(req,res)=> {
    try {
       
        const service= await Service.findById(req.params.id)
        console.log(service);
        
        if (!service) return res.status(httpCodes.NO_CONTENT).send('service doesn\'t exist')
        return res.status(httpCodes.OK).send(service.name)
    }catch(err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }
})
Router.get('/getservices',verify,async(req,res)=> {
    try {
        const service= await Service.find().populate('admin','username')
        console.log(service);
        
        if (!service) return res.status(httpCodes.NO_CONTENT).send('service doesn\'t exist')
        return res.status(httpCodes.OK).send(service)
    }catch(err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send(err)
    }
})
Router.put('/modifyservice/:name', verify, async (req, res) => {
	try {
        let service =[]
        let administration=false
        if(req.body.admin!='') {const admin_name=await User.findOne({name:req.body.admin});
        if (!admin_name) return res.status(httpCodes.NO_CONTENT).send("User doesn't exist");
        administration=true
        service = await Service.findOneAndUpdate({ name: req.params.name },{name:req.body.name_2,description:req.body.description,admin:admin_name._id,adress:req.body.adress,hasAdmin:administration});}
         else {service = await Service.findOneAndUpdate({ name: req.params.name },{name:req.body.name_2,description:req.body.description,adress:req.body.adress,hasAdmin:administration})};
        
	
		if (!service) return res.status(httpCodes.NO_CONTENT).send("service doesn't exist");
		
	
		return res.status(httpCodes.OK).send('the service has been updated');
	} catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
}); 

Router.delete('/deleteService?',verify,async(req,res)=> {
    try {
        const user= await User.findById(req.user._id)
            if (user.role!=process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
  
        const service= await Service.findOneAndDelete({name:req.query.name})
        if (!service) return res.status(httpCodes.NO_CONTENT).send("service doesn't exist");
		return res.status(httpCodes.OK).send('the service has been deleted');

    }catch (err) {
		return res.status(httpCodes.BAD_REQUEST).send({ msg: err.message });
	}
})



module.exports = Router