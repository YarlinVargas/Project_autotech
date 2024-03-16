import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import logo from '../img/logo.png'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  
  const auth = useAuth();

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }


async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if(auth.isAuthenticated){
    return <Navigate to="/dashboard"/>;
  }
  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Username</label>
        <input
          type="text"
          placeholder="text"
          value={username}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
        />

        <button>Login</button>
      </form>

      {/* <div className="section"></div>
        <center>
            <img className="responsive-img" src={logo} /> 
            <div className="section"></div>
            <div className="container">
                <div className="z-depth-1 grey lighten-4 row" >
                    <form className="col s12" action="../../vistas/inicio/inicio.html" method="post" onsubmit="return validarFormulario();">
                        <div className='row'>
                            <div className='col s12'></div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='email' name='email' id='email' />
                                <label htmlFor='email'>Ingrese su Correo</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='password' name='password' id='password' />
                                <label htmlFor='password'>Ingrese su Clave</label>
                            </div>
                            <label>
                                <a className='pink-text' href='#!'><b>Olvido su clave?</b></a>
                            </label>
                        </div>
                        <br />
                        <center>
                            <div className='row'>
                                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect red darken-2' >Ingresar</button>
                            </div>
                        </center>
                    </form>
                </div>
            </div>
            <a href="../registro/registrosUsuario.html">Crear cuenta</a>
        </center> */}
    </DefaultLayout>
  );
}
