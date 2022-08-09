import React, { Component } from 'react';
import axios from 'axios';
import ViewVehicle from './ViewVehicle';

  export default class VehicleReg extends Component{
    constructor(props){
      super(props);

      this.state={
        PlateNumber:""
      }
    }

    handleChange = (e) => {
      const {name,value} = e.target;
      let nam = e.target.name;
      let val = e.target.value;
    
      this.setState({
        ...this.state,
        [name]:value
      })  
    }
    
    onSubmit=(e)=>{
      e.preventDefault();

      const {PlateNumber} = this.state;

      const data={
          PlateNumber:PlateNumber     
      }

      console.log(data)

      axios.post('http://localhost:3000/vehicles/save',data).then((res) =>{
        if(res.data.success){
          this.setState(
            {
              PlateNumber:""
            }
          )
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
              <button className="btn btn-warning" style = {{textDecoration:'none',color:'white'}} onClick={this.onSubmit}>Submit</button>
            </div>
          </div>
          <ViewVehicle/>
        </>
    )
  }
}