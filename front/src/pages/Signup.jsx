import { useState } from "react";
import API from "../services/api";

function Signup(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



const handleSignup = async (e) => {
    e.preventDefault();
    try {
        await API.post("users", {username, email, password});
        alert("Utilisateur créé avec succès !");
        setUsername("");
        setEmail("");
        setPassword("");
    } catch (error) {
        alert("Erreur lors de l'inscription");
    }
};

return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
);
}

export default Signup;