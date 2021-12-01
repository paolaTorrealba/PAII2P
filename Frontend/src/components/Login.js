import React from 'react';

const Login = ({ handleSubmit, handleChange, username, password }) => {

    return (
        <div className="form" onSubmit={handleSubmit}>
             <h1 className="title is-2" >Login</h1>
            <form>
                <input type="text" className="input" style={{ "marginBottom": "1vh" }} onChange={handleChange} 
                name="username" value={username} placeholder="Usuario" />
                <input type="password" className="input" style={{ "marginBottom": "3vh" }} onChange={handleChange} 
                name="password" value={password} placeholder="password" />
                <input type="submit" value="Ingresar" />
            </form>
        </div>
    );
}

export default Login;
