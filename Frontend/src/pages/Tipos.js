import React, { useState, useEffect } from 'react'
import { useParams } from "react-router";
import { Link } from 'react-router-dom';


const Tipos = () => {
    const {tipo} = useParams();
    const [lista, setLista] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        fetch("http://localhost:3100/api/mascotas/")

        .then(res=>res.ok?res.json():Promise.reject(res.status + ": " + res.statusText))
        .then(lista=>{
            setLista(lista.filter(mascota => mascota.tipo === tipo));
        })
        .catch(err=>console.error(err))
        .finally(() => setIsLoading(false));
    }, [tipo]);

    return (
        <>
           
<nav className="navbar">
    <Link to="/" className="navbar-item">Ir a inicio</Link>
</nav>
<h1 >{tipo}</h1>
<div>
    {                  
        <>
            {  lista.length?
                <>
                {
                    lista.map(mascota => {     return (
                    <div key={mascota.id}>
                        <div className="card" >                                                                                   
                            <p><b>Nombre:</b> {mascota.nombre}</p>
                            <p><b>Vacunado:</b> {mascota.vacunado? "si": "no"}</p>
                            <p><b>Edad:</b> {mascota.edad} años</p>
                            <p><b>Tipo:</b> {mascota.tipo}</p>                                                
                            <p><b>Observaciones:</b>
                             {mascota.observaciones ?mascota.observaciones:"No hay observaciones"}</p>                                
                                   
                        </div>
                    </div>
                        ); 
                    })
                }
                </>:<h2>Sin resultados</h2>
            }
        </>
    }
</div>
</>
);
};

export default Tipos;