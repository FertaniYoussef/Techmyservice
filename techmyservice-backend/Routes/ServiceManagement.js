const Router = require('express').Router();
const  {Service}= require('../models/Services');
const {User}= require('../models/User')
const httpCodes = require('../constants/httpCodes');
const verify=require('../middleware/tokenverif')

Router.post('/addservice',verify,async(req,res)=> {
    try {
        const user= await User.findById(req.user._id)
        
        if (user.role!=process.env.SuperAdmin) return res.status(httpCodes.UNAUTHORIZED).send('Access Denied')
        const service_name = await Service.findOne({name:req.body.name})
        if (service_name) return res.status(httpCodes.BAD_REQUEST).send('Service already exist')
        const service = new Service({
            name: req.body.name,
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


module.exports = Router