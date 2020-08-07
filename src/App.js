import React from 'react';
import NavBar from './NavBar';
import Status from './Status';

const App=()=>{
    return(
      <>
      <NavBar/>
      <div className="container">
        <div className="row">
        <div className="col"></div>
        <div className="col-6"><Status/></div>
        <div className="col">Activity</div>
        </div>
      </div>
      
      </>
    );


}

export default App;
