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

//edit or update vehicle details function 
router.put('/vehicles/update/:id', (req,res)=>{ //declaring the end point
    Vehicles.findByIdAndUpdate(
        req.params.id,{
        //gets the id of the selected post
        $set:req.body //body-updates all the information
        } ,
        (err, vehicle)=>{
            if(err){
                return res.status(400).json({
                    error:err
                });
            }
            //if no error
            return res.status(200).json({
                success:"Vehicle has been updated successfully....!"
            });
        }
    );
});

//delete vehicle
router.delete('/vehicles/delete/:id', (req, res) => {
    Vehicles.findByIdAndRemove(req.params.id).exec((err, deletedVehicle) => {
        if(err) return res.status(400).json({
            message: "Deleted unsuccessful", err
        });

        return res.json({
            message:"Deleted successfully", deletedVehicle
        });
    });
});

module.exports = router;