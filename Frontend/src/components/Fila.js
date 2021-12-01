import React from "react";
import { Link } from "react-router-dom";

//por cada fila muestro los datos de una mascota:
//nombre, tipo, boton, detalles, boton modificar y boton eliminar
const Fila = ({ mascota, setMascotaEdit, borrarMascota }) => {
  const { id, nombre, tipo } = mascota;
  return (
    <tr>
      <td>{nombre}</td>
      <td>{tipo}</td>
      <td>
        <Link to={`mascota/${id}`}>
          <button className="button ">Ver</button>
        </Link>
        <button
          className="button "
          onClick={() => {
            setMascotaEdit(mascota);
          }}
        >
          Modificar
        </button>
        <button
          className="button"
          onClick={() => {
            borrarMascota(id);
          }}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Fila;
