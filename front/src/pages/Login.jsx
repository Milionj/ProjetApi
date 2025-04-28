import { useState } from "react";
import API from "../services/api";

function Login() {
    const [username, setUsername] = useState("");
    const[password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await API.post("/login", {username, password});
            alert(`Connecté ! Token : ${response.data.accessToken}`);
            console.log(response.data);  // Affiche le token dans la console
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la connexion");
        }
    };
    
    return (
        <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Se connecter</button>
      </form>
    </div>
    );
}

export default Login