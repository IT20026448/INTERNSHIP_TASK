import React, { Component } from 'react';
import axios from 'axios';

  export default class ViewVehicle extends Component{
    constructor(props){
      super(props);

      this.state={
        PlateNumber:[]
      }
    }

    componentDidMount(){
        this.retrieveVehicleDetails();
    }
  
    retrieveSpecificVehicleDetails(PlateNumber, searchKey){
        const result = PlateNumber.filter((PlateNumber) => 
        PlateNumber.PlateNumber.toLowerCase().includes(searchKey)
        )
        this.setState({PlateNumber:result})
    }

    handleSearchArea = (e) => {
        const searchKey = e.currentTarget.value;

        axios.get('http://localhost:3000/vehicledetails').then(res => {
            if(res.data.success){
                this.retrieveSpecificVehicleDetails(res.data.existingVehicles, searchKey)
            }
        })
    }

    retrieveVehicleDetails(){
      axios.get('http://localhost:3000/vehicledetails').then(res=>{
        if(res.data.success){
          this.setState({
            PlateNumber:res.data.existingVehicles
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
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.PlateNumber.map((PlateNumber, index) => (
                      <tr key={index}>
                        <td>{PlateNumber.PlateNumber}</td>
                      </tr>
                       ))}
                  </tbody>
                </table>
              </div>
    )
  }
}