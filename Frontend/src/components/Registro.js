import { React} from 'react';

const Registro = ({handleChange, handleSubmit, username, password}) => {   

    return (
    <>
    <h1 className="title ">Registro</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"
                name="username"
                placeholder="Usuario"
                autoComplete="off"
                value={username}
                onChange={handleChange}
                />

            <input type="password"
                name="password"
                placeholder="password"
                autoComplete="off"
                value={password}
                onChange={handleChange}
                />
     
            <input className="button " type="submit" value="Registrarse"/>
        </form>
    </>
    )
}

export default Registro
