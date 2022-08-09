import React, { Component } from 'react';
import axios from 'axios';

  export default class ViewVehicle extends Component{
    constructor(props){
      super(props);

      this.state={
        PlateNumber:"",
        VehicleType:""
      }

      this.state={
        vehicles:[]
      }
    }

    componentDidMount(){
        this.retrieveVehicleDetails();
    }

    retrieveVehicleDetails(){
      axios.get('http://localhost:8000/vehicledetails').then(res=>{
        if(res.data.success){
          this.setState({
            vehicles:res.data.existingVehicles
          });
        }
      });
    }

    onDelete = (id) => {
      axios.delete(`http://localhost:8000/vehicles/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        this.retrieveVehicleDetails();
      });
    }

    render() {
        return (
            <div>
                <table>
                  <thead>
                    <tr>
                      <th>Plate Number</th>
                      <th>Vehicle Type</th>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.vehicles.map((vehicles, index) => (
                      <tr key={index}>
                        <td>{vehicles.PlateNumber}</td>
                        <td>{vehicles.VehicleType}</td>
                        <button className="btn btn-warning" style = {{textDecoration:'none',color:'white', backgroundColor:'blue'}} href={`/UpdateVehicle/${vehicles._id}`}>Edit vehicle</button>
                        <button className="btn btn-warning" style = {{textDecoration:'none',color:'white', backgroundColor:'blue'}} href="/" onClick={() => this.onDelete(vehicles._id)}>Delete vehicle</button>
                      </tr>
                       ))}
                  </tbody>
                </table>
              </div>
    )
  }
}