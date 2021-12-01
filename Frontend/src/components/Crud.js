import { React, useState, useEffect } from 'react'
import Form from './Form'
import Main from './Main'
import Tabla from './Tabla'
import { Link, useHistory } from 'react-router-dom';
import Loader from './Loader'

//url a la 'base'
//const URL = "http://localhost:3000/mascotas/";
const URL = "http://localhost:3100/api/mascotas/";
const URLTIPOS = "http://localhost:3100/api/tipos/";

const Crud = () => {
    const token = window.localStorage.getItem("token");
    const [mascotas, setMascotas] = useState([])
    const [mascotaEdit, setMascotaEdit] = useState(null)
    const [tiposMascota, setTipos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        const getMascotas = async (url) => {
            try {
                const res = await fetch(url, {
                    headers: {
                        "authorization": JSON.stringify(token)
                    }
                });
                const data = await res.json();
                data.forEach((mascota) => {
                    setMascotas((mascotas) => {
                        return [...mascotas, mascota];
                    });
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        }

        const getTipos = async (url) => {
            try {
                const res = await fetch(url, {
                    headers: {
                        "authorization": JSON.stringify(token)
                    }

                });
                const data = await res.json();
                data.forEach((tipo) => {
                    setTipos((tiposMascota) => {
                        return [...tiposMascota, tipo];
                    });
                });
            } catch (error) {
                console.error(error.message);
            }
        }
        setTimeout(() => {
            getMascotas(URL);
            getTipos(URLTIPOS);
            setIsLoading(false);
        }, 700);

    }, [token])


    const createMascota = (newMascota) => {
        setIsLoading(true);

        setTimeout(() => {
            fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": JSON.stringify(token)
                },
                body: JSON.stringify(newMascota)
            }).then(res => res.json())
                .then(nuevaMascota => setMascotas([...mascotas, nuevaMascota]))
                .finally(() => {
                    setIsLoading(false);
                    alert("La mascota se creo con éxito");
                });
        }, 500);
    };

    const updateMascota = (mascotaUpdated) => {
        setIsLoading(true);
        setTimeout(() => {
            fetch(URL + mascotaUpdated.id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": JSON.stringify(token)
                },
                body: JSON.stringify(mascotaUpdated)
            }).then((res) => {
                return res.json();
            })
                .then((mascotaModificada) => {
                    setMascotas((mascotas) => {
                        return mascotas.map((mascota) => mascota.id === mascotaModificada.id ? mascotaModificada : mascota);
                    });
                    alert("La mascota se modifico con éxito");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);
    }

    const borrarMascota = (id) => {

        if (window.confirm("Confirma eliminación de " + id)) {
            setIsLoading(true);

            setTimeout(() => {
                fetch(URL + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": JSON.stringify(token)
                    },
                }).then((res) => {
                    if (res.ok) {
                        setMascotas(mascotas => {
                            return mascotas.filter(mascota => mascota.id !== id);
                        });
                        alert("Se elimino la mascota con exito");
                    }
                })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }, 500);
        }
    }

    const irDetalle = id => {
        history.push("/mascota/" + id);
    };

    return (

        <>
            {
                token ? (
                    <div className="columns is-centered">
                        <div className="column is-6">
                            <Form className="form"
                                createMascota={createMascota}
                                updateMascota={updateMascota}
                                mascotaEdit={mascotaEdit}
                                setMascotaEdit={setMascotaEdit}
                                tiposMascota={tiposMascota}
                                irDetalle={irDetalle}
                            />
                        </div>
                        <div className="column is-6">
                            <h2  className="title is-3">Mascotitas</h2>
                            {
                                isLoading ? (<Loader />) :
                                    (<Tabla data={mascotas}
                                        setMascotaEdit={setMascotaEdit}
                                        borrarMascota={borrarMascota}
                                        irDetalle={irDetalle} />)
                            }

                        </div>
                    </div>


                ) : (<div ><h1>Usuario no logueado - Iniciar Sesión</h1>
                <button className="button"><Link to="/">Volver al login</Link></button></div>)
            }
            </>
    )
}

export default Crud
