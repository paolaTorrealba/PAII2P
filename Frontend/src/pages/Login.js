import { Link } from 'react-router-dom';
import Login from '../components/Login';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const initialForm = {
    username: "",
    password: ""
}

function LoginPage() {

    const tokenAntes = window.localStorage.getItem("token");
    const history = useHistory();
    const [form, setForm] = useState(initialForm);
    const { username, password } = form;
    const [isLoading, setIsLoading] = useState(false);
    const URL_LOGIN = "http://localhost:3100/api/login/";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!(username && password)) {
            alert("Ingrese usuario y password");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            fetch(URL_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
                .then((user) => {
                    if (user === undefined) {
                        alert("Datos incorrecos");
                        return;
                    }
                    const { token } = user;
                    window.localStorage.setItem("token", "Bearer " + token);                   
                    history.push("/home");
                })
                .catch(error => {
                    alert(error.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 500);
    }

    const handleChange = ({ target }) => {
        setForm(() => {
            return {
                ...form,
                [target.name]: target.value
            }
        });
    }

    return (
        <>
        {
            tokenAntes == null? isLoading ? (<div></div>) : (<div>
            <Login handleChange={handleChange} handleSubmit={handleSubmit} username={username} password={password} />
            <button ><Link to="/registro">Registrarse</Link></button>
        </div>) : history.push("/home")
        }
            
                            
        </>
        
    );
}

export default LoginPage;