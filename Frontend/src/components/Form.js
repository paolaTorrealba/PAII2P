import React, { useEffect, useState } from 'react'
import Select from './Select';

const initialForm = {
    id: null,
    nombre: "",
    edad: 0,
    tipo: "default",
    vacunado: false,
    observaciones: ""
}

const Form = ({ createMascota, updateMascota, mascotaEdit, setMascotaEdit, tiposMascota }) => {

    const [form, setForm] = useState(initialForm)
    const { id, nombre, edad, tipo, vacunado, observaciones } = form;
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (mascotaEdit) {
            setChecked(mascotaEdit.vacunado)
            setForm(mascotaEdit);
        }
    }, [mascotaEdit])

    const handledCheck = () => {
        setChecked(!checked)
        setForm((form) => {
            return {
                ...form,
                vacunado: !checked
            }
        })
    }

    const handledSelectChange = (e) => {
        setForm((form) => {
            return {
                ...form,
                tipo: e
            }
        })
    }

    const handledChange = (e) => {
        setForm((form) => {
            return {
                ...form,
                [e.target.name]: e.target.value
            }
        })
    }

    const handledSubmit = (e) => {
        e.preventDefault();
        if (!nombre || !edad || tipo === "default") {
            alert("complete todos los campos")
            return;
        }
        if (id) {
            updateMascota(form)
        } else {
            createMascota(form)
        }
        handledReset();
    }

    const handledReset = (e) => {
        setForm(initialForm);
        setMascotaEdit(null);
    }

    return (
        <>
            <h2 className="subtitle">{id ? "Modificar Mascota" : "Agregar Mascota"}</h2>

            <form onSubmit={handledSubmit}>
                <div className="field">
                    <label className="label">Nombre</label>
                    <div className="control">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="nombre"
                            autoComplete="false"
                            value={nombre}
                            onChange={handledChange}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Edad</label>
                    <div className="control">
                        <input
                            type="number"
                            name="edad"
                            placeholder="edad"
                            autoComplete="false"
                            value={edad}
                            onChange={handledChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <label className="checkbox">
                            <input
                                className="mr-3"
                                name="vacunado"
                                type="checkbox"
                                checked={vacunado}
                                onChange={handledCheck}
                            />
                            Vacunado
                        </label>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Tipo: </label>
                    <div className="control">
                        <div className="select">
                            <Select
                                name="tipo"
                                value={tipo}
                                onSelectChange={handledSelectChange}
                            />
                        </div>
                    </div>
                </div>

               

                <div className="field">
                    <div className="control">
                        <textarea
                            className="textarea is-half"
                            cols="5"
                            name="observaciones"
                            type="text"
                            placeholder="observaciones"
                            value={observaciones}
                            onChange={handledChange}
                        />
                    </div>
                </div>

                <div className="field is-grouped">
                    <div className="control">
                    <button
                            className="button "
                            type="reset"
                            onClick={handledReset}
                        >Limpiar</button>
                        <button
                            className="button "
                            type="submit"
                        >Guardar</button>
                       
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form
