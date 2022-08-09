import React, {} from  'react';
import {BrowserRouter  as Router, Routes,Route} from 'react-router-dom';

import VehicleReg from './components/VehicleReg';

export default function App() {
  return (
    <div>
        <Router>
            <Routes>
                <Route   exact path = "/" element = {<VehicleReg/>}/>
        </Routes>
      </Router>
    </div>
  );
}