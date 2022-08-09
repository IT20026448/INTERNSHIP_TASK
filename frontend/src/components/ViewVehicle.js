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
                      </tr>
                       ))}
                  </tbody>
                </table>
              </div>
    )
  }
}