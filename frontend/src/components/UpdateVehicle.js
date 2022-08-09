import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function UpdateVehicle(){
    const[PlateNumber, setPlateNumber] = useState("");
  
    const id = useParams();
  
    const[vehicles] = useState({
        PlateNumber:""
    })
  
    const changeOnClick = async (e) => {
        e.preventDefault();
  
        const formData = new FormData();
  
        formData.append("PlateNumber", PlateNumber);
  
        setPlateNumber("");
  
        vehicles.PlateNumber = formData.get("PlateNumber");
  
        await axios.put(`http://localhost:8000/vehicles/update/${id?.id}`, vehicles)
        .then(res => {
            alert("Updated successfully");
        })
        .catch(err => {
            alert("update failed")
            console.log(err);
        })
    }
    
    useEffect(function effectFunction(){
        axios.get(`http://localhost:8000/vehicles/${id?.id}`)
        .then(res => {
            setPlateNumber(res.data.vehicles.PlateNumber);
        })
        .catch(err => console.log(err));
    }, []);

    return(
        <div>
            <center><h2>Edit vehicle details</h2></center>

            <table>
                <tr>
                    <th>
                        <form>
                            <label>Plate Number :</label>
                            <input type="text" name="plateNo" value={PlateNumber} onChange={e => setPlateNumber(e.target.value)}/>
                            <button onClick={(e) => changeOnClick(e)}>Update</button>
                        </form>
                    </th>
                </tr>
            </table>            
        </div>
    );
  }