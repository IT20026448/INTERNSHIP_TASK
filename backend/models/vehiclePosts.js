const mongoose = require('mongoose');

const postVehicleSchema = new mongoose.Schema({
    PlateNumber: {
        type:String,
        required:true
    },
    VehicleType: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Vehicle', postVehicleSchema);