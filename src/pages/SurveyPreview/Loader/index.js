import React from 'react';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.sass";

const LoadResults = () =>{
    return(
        <div className = 'loader-container'>
            <Loader
                type="TailSpin"
                color="#3f51b5"
                height={75}
                width={100}
            />
     </div>
    )
}

export default LoadResults;