import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(""); // << on stocke le token Captcha
  const navigate = useNavigate();

  // Quand l'utilisateur valide le captcha
  const handleCaptcha = (value) => {
    setCaptchaToken(value); // on récupère le token généré par Google
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Vérifier que le CAPTCHA est bien rempli
    if (!captchaToken) {
      return alert("Veuillez valider le CAPTCHA avant de vous connecter !");
    }

    try {
      // Envoyer la requête de connexion avec username, password ET captchaToken
      const response = await API.post("/api/auth/login", { 
        username, 
        password,
        captchaToken, // important !
      });

      alert("Connexion réussie !");
      console.log(response.data);  // Affiche les données dans la console

      // 1. Stocker le token dans le localStorage pour le réutiliser plus tard
      localStorage.setItem("accessToken", response.data.accessToken);

      // 2. Rediriger vers la page ToDos
      navigate("/todos");

    } catch (error) {
      console.error(error);
      alert("Erreur lors de la connexion");
    }
  };
  
  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* >>> Le composant Google reCAPTCHA */}
        <ReCAPTCHA
          sitekey="6LfcMygrAAAAAMYOpaSxjMP_ld9_5Dz87WxBZQyY" // clé publique
          onChange={handleCaptcha}
        />

        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
