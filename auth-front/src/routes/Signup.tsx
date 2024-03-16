import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate,  useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  try{
    const response = await fetch("http://localhost:3000/api/signup",{
      method :"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        username,
        password
      }),
    });
    if (response.ok) {
      const json = (await response.json()) as AuthResponse;
      console.log(json);
      setUsername("");
      setPassword("");
      setName("");
      goTo("/");
    } else {
      const json = (await response.json()) as AuthResponseError;

      setErrorResponse(json.body.error);
    }
  } catch (error) {
    console.log(error);
  }
}
  //Determina si esta logeado o no
  if(auth.isAuthenticated){
    return <Navigate to="/dashboard"/>;
  }
  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Username</label>
        <input
          type="text"
          placeholder="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Create user</button>
      </form>
    </DefaultLayout>
  );
}
