import React from 'react'
import Fila from './Fila'

const Tabla = ({ data, setMascotaEdit, borrarMascota }) => {
    return (<>
        <h2 className="subtitle">Mascotas</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>Nombre Mascota</th>
                    <th>Tipo</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {data.length
                    ? (data.map(mascota => (
                        <Fila
                            key={mascota.id}
                            mascota={mascota}
                            setMascotaEdit={setMascotaEdit}
                            borrarMascota={borrarMascota}
                        />)))
                    : <tr><td colSpan={3}>No hay datos para mostrar</td></tr> }
            </tbody>
        </table>
    </>
    )
}

export default Tabla
