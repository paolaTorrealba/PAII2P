import React from 'react';
import { NavLink } from 'react-router-dom';

const Ruteo = ({tipo}) => {
    return (
        <>
     <NavLink className="navbar-item"  exact to={`/tipos/${tipo}`}>
         {tipo
     }</NavLink>
        </>
    );
};

export default Ruteo;
