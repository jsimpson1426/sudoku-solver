import React from 'react';
import "./slider.sass";

const Slider = () => {
    return ( 
    <React.Fragment>
        <ul className="slider-ul">
            <li className="slider-li"><p className="slider-p">Slow</p></li>
            <li className="slider-li"><input type="range" min="1" max="100" defaultValue="50" className="slider"></input></li>
            <li className="slider-li"><p className="slider-p">Fast</p></li>
        </ul>
    </React.Fragment> );
}
 
export default Slider;