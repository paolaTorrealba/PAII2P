import React, { useEffect, useState } from 'react'

//url a tipos
const URL = "http://localhost:3100/api/tipos/";

//recibe el nombre y el valor y el evento
const Select = ({name, value, onSelectChange}) => {

    const [tipos, setTipos] = useState([])

    //obtengo los tipos desde la url primero fetc y luego res
    //guardo los datos con setTipos()
    useEffect(() => {
        const getTipos = async (url) => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                setTipos(data)
            } catch (error) {

            }
        }
        //traigo la coleccion Tipos
        getTipos(URL)
    }, [])
    
    const handleChange = (e) => {
        onSelectChange(e.target.value)
    }

    return (
//le paso los parametros al componenete 
        <select name={name} value={value} onChange={handleChange} >
            <option value="default" disabled>Seleccione..</option>
             {
                 //por cada tipo retorno los datos id, valor y descripcion
                tipos.map((tipo) => {
                    return <option key={tipo.id} value={tipo.descripcion}>
                        {tipo.descripcion}
                    </option>
                })
            }
        </select>
    )
}

export default Select
