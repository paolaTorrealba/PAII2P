
import React from 'react';
import BotonRuta from './Ruteo';

const Nav = () => {
    return (
        <div className="navBar">
            <nav className="navbar">
            <BotonRuta tipo="Pez"/>
                <BotonRuta tipo="Roedor"/>
                <BotonRuta tipo="Perro"/>
                <BotonRuta tipo="Gato"/>
                <BotonRuta tipo="Reptil"/>
                
            </nav>
        </div>
        
    );
};

export default Nav;
