import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import Main from '../components/Main'

const Detalle = () => {

    const [loading, setloading] = useState(false)
    const { id } = useParams();
    const [mascota, setMascota] = useState({})
    const { nombre, edad, tipo, vacunado, observaciones } = mascota;

    useEffect(() => {
        setloading(true);
        const URL = "http://localhost:3100/api/mascotas/";
        fetch(`${URL}/${id}`)
            .then(res => res.ok ? res.json() : Promise.reject(res.status + ":" + res.statusText))
            .then(data => {
                console.log(data)
                setMascota(data)
                setloading(false);
            })
            .catch((error) => {
                console.error(error)
                setloading(false);
            })
    }, [id])

    return (
        <section className="section">
        {
            loading
                ? (<Main />)
                : (
                <div className="container">                   
                    <div className="card">
                        <div className="card-content">
                            <div className="media">
                                <div className="media-content">
                                    <p className="subtitle"> Nombre: {nombre}</p>    
                                    <p className="subtitle ">Vacunado: {vacunado ? "SI" : "NO"}</p>         
                                    <p className="subtitle ">Edad: {edad}</p>                      
                                    <p className="subtitle ">Tipo: {tipo}</p>
                                   
                                   
                                </div>
                            </div>
    
                            <div className="content">
                                {observaciones}
                            </div>
                        </div>
                    </div>
                    <Link to="/"><button className="button ">Ir a Inicio</button></Link>
                </div>
           )
        }
         </section>
    )
}

export default Detalle
