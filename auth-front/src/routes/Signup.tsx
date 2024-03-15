import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { API_URL } from "../auth/constants";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault();
  try{
    const response = await fetch(`${API_URL}signup`,{
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
    if(response.ok){
      console.log("user created successfully");
    }else{
      console.log("Something went wrong");
    }
  }catch(error){
    console.log(error);
  }
}

  if(auth.isAuthenticated){
    return <Navigate to="/dashboard"/>;
  }
  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Signup</h1>
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
