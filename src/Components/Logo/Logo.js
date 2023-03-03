import React from "react";
// import ReactDOM from 'react-dom';
import "./Logo.css"
import Tilt from 'react-parallax-tilt';
import Brain from "./Brain.png"

const Logo = () => {
 return (
     <div className="ma4 mt0">
         <Tilt>
            <div className="Tilt br2 shadow-2" options={{max: 25 }}  style={{ height: '100px', width: "100px" }}>
              <h1 className="Tilt-inner"><img alt="Brain Logo" src={Brain}></img></h1>
             </div>
         </Tilt>
        </div>
    );
}

export default Logo;
