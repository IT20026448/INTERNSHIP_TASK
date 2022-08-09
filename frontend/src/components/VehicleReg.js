import React, { Component } from 'react';
import axios from 'axios';
import ViewVehicle from './ViewVehicle';

export default class VehicleReg extends Component{
  constructor(props){
    super(props);

    this.state={
      PlateNumber:"",
      VehicleType:""
    }
  }

  handleChange = (e) => {
    const {name,value} = e.target;
    const nam = e.target.name;
    const val = e.target.value;
   
    function containLetter(str) {
      return /[A-Z]/.test(str);
    }

    function containNumber(str){
      return /[0-9]/.test(str);
    }

    function containWhiteSpace(str){
      return /^\+$/.test(str);
    }

    this.setState({
      ...this.state,
      [name]:value
    })  
      
    if(val.includes("ශ්‍රී") && !containLetter(val)){
      this.setState({
        VehicleType : "Vintage"
      });
    } 
    else if(containLetter(val) && containNumber(val)){
      this.setState({
        VehicleType : "Modern"
      })
    }
    else if(containNumber(val) && !containLetter(val)){
      this.setState({
        VehicleType: "Old"
      })
    }
  }   
       
  onSubmit=(e)=>{
    e.preventDefault();

    const {PlateNumber, VehicleType} = this.state;

    const data={
      PlateNumber:PlateNumber,
      VehicleType:VehicleType     
    }

    console.log(data)

    axios.post('http://localhost:8000/vehicles/save',data).then((res) =>{
      if(res.data.success){
        this.setState(
        {
          PlateNumber:"",
          VehicleType:""
        })
          alert("Saving details");
      }
    }) 
  }

    render() {
      return (
        <>
          <div>
            <form>
              <div className="form-group">
                <label htmlFor="inputNumber" className="form-label" >Enter Vehicle Number : </label>
                <input type="text" className="form-control" name="PlateNumber" value={this.state.PlateNumber} onChange={this.handleChange} required/>
              </div>
            </form>
            <div>
              <button className="btn btn-warning" style = {{textDecoration:'none',color:'white', backgroundColor:'blue'}} onClick={this.onSubmit}>Add vehicle</button>
            </div>
          </div>
          <ViewVehicle />
          <div>
    </div>
        </>
    )
  }
}