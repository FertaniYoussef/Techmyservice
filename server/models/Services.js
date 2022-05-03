const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
	name: { type: String, unique: true, required: true },
    admin : {type :mongoose.Schema.Types.ObjectId,ref : 'Admin' },
    adress: {type: String , required: true, default:''},
    description : {type: String ,default : ''},
    icon: {type:String,default:null},
    hasAdmin:{type:Boolean,default:false},
    geoposition: {
        type :{
            default: "Point",
            type: String, 
        },
        coordinates: {
            type : [Number],
            index : "2dsphere",
            default: [0,0]
        }
    }
});

module.exports.Service = mongoose.model('Service', serviceSchema);
