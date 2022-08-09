const express = require('express');
const vehicles = require('../models/vehiclePosts');
const Vehicles = require('../models/vehiclePosts');
const router = express.Router();

//save vehicle plate number
router.post('/vehicles/save', (req, res) => {
    let newVehicle = new Vehicles(req.body);

    newVehicle.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }

        return res.status(200).json({
            success: "registration saved successfully"
        });
    });
});

//get all vehicle details
router.get('/vehicledetails', (req, res) => {
    Vehicles.find().exec((err, vehicles) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success: true,
            existingVehicles:vehicles
        });
    });
});

//get specific vehicle's details
router.get('/vehicles/:id', (req, res) => {
    const vehicleID = req.params.id

    vehicles.findById(vehicleID, (err, vehicles) => {
        if(err){
            return res.status(400).json({
                success: false, err
            })
        }

        return res.status(200).json({
            success: true, 
            vehicles
        });
    });
});

module.exports = router;